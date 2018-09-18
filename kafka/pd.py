from confluent_kafka import Producer
# 实例化生产者
p = Producer({"bootstrap.servers":"localhost:2181"})

msg = "hello world"

# 发送消息
p.produce("test", msg.encode("utf-8"))