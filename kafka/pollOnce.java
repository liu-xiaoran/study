// note: 一次 poll 过程，除了获取新数据外，还会做一些必要的 offset-commit 核 reset-offset  的操作
private Map<TopicPartition, List<ConsumerRecord<K, V>>> pollOnce(long timeout) {
    // note： 1. 获取 GroupCoordinator 地址并连接、加入 Group、sync Group、自动 commit, join 及 sync 期间 group 会进行 rebalance
    coordinator.poll(time.milliseconds());
    // note: 2. 更新订阅的 topic-partition 的 offset（如果订阅的 topic-partition list 没有有效的 offset 的情况下）
    if (!subscriptions.hasAllFetchPositions())
        updateFetchPositions(this.subscriptions.missingFetchPositions());
    // note: 3. 获取 fetcher 已经拉取到的数据
    Map<TopicPartition, List<ConsumerRecord<K, V>>> records = fetcher.fetchedRecords();
    if (!records.isEmpty())
        return records;
    // note: 说明上次 fetch 到是的数据已经全部拉取了,需要再次发送 fetch 请求,从 broker 拉取数据
    // note: 4. 发送 fetch 请求,会从多个 topic-partition 拉取数据（只要对应的 topic-partition 没有未完成的请求）
    fetcher.sendFetches();
    long now = time.milliseconds();
    long pollTimeout = Math.min(coordinator.timeToNextPoll(now), timeout);
    //note: 5. 调用 poll 方法发送请求（底层发送请求的接口）
    client.poll(pollTimeout, now, new PollCondition() {
        @Override
        public boolean shouldBlock() {
            return !fetcher.hasCompletedFetches();//note: 有完成的 fetcher 请求的话,这里就不会 block,但是 block 也是有最大时间限制
        }
    });
    //note: 6. 如果 group 需要 rebalance,直接返回空数据,这样更快地让 group 进行稳定状态
    if (coordinator.needRejoin())
        return Collections.emptyMap();
    return fetcher.fetchedRecords();
}