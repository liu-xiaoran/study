#coding=utf-8
from confluent_kafka import Producer

p = Producer({"bootstrap.servers": "localhost:9092"})

msg = "hello world"

p.poll(0)
p.produce("test", msg.encode("utf-8"))

p.flush()