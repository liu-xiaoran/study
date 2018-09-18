from confluent_kafka import Consumer, KafkaError
# 消费者实例化
c = Consumer({
  "bootstrap.servers": "localhost:2181",
  "group.id": "group"
})

# 订阅topics
c.subscribe(['test'])

