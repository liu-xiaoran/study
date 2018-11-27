#coding=utf-8
from confluent_kafka import Producer
import MySQLdb
import json
import time
import random


p = Producer({"bootstrap.servers": "118.24.53.99:9092"})

db = MySQLdb.connect("localhost", "root", "123456", "test_kafka", charset='utf8' )
cursor = db.cursor()

sql = "SELECT msg_body FROM order_kafka_msg;"

def delivery_report(err, msg):
    """ Called once for each message produced to indicate delivery result.
        Triggered by poll() or flush(). """
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))


data_list=[]

# while (True):
cursor.execute(sql.encode("utf-8"))
results = cursor.fetchall()
for result in results:
        print("------------------")
        setJson = json.dumps(json.loads(result[0]),ensure_ascii=False)
        print(setJson.encode("utf-8"))
        p.produce("test",setJson.encode("utf-8"),callback=delivery_report)

p.flush()
    # time.sleep(60)
    

