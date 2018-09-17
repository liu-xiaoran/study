from confluent_kafka import Producer

p = Producer({"bootstrap.servers":"localhost:2181"})

print p.list_topics()