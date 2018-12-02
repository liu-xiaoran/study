#coding=utf-8
from confluent_kafka import Producer
import json
import time
import random
import copy


p = Producer({"bootstrap.servers": "118.24.53.99:9092"})

def delivery_report(err, msg):
    """ Called once for each message produced to indicate delivery result.
        Triggered by poll() or flush(). """
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))


data_list=[]


count = 1
while (count<=10):
    jsonData = {
            "logDate": "2018-09-09",
            "logTime": "12:00:00",
            "level": "3",
            "describe": "我是测试的",
            "content": "我是测试的内容",
            "deliveryCode": "C27001",
            "billNo": "",
            "type": "down-order"
        }
    
    jsonData["billNo"] = "CHY092"+str(count)

    setJson = json.dumps(jsonData,ensure_ascii=False)
    # data_list.append(setJson)
    print(setJson)

    p.produce("kafkalogs", setJson,callback=delivery_report)
    p.flush()
    count = count + 1
    time.sleep(1)
    

# for data in data_list:

    # p.produce("test", data.encode("utf-8"),callback=delivery_report)
    # p.produce("test", data,callback=delivery_report)

