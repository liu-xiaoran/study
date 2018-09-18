from confluent_kafka import Producer

p = Producer({"bootstrap.servers": "localhost:9092"})

msg = "hello world"

p.produce("test", msg.encode("utf-8"))
