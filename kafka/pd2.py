#coding=utf-8
from confluent_kafka import Producer
import json
import time
import random


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
while (True):
    jsonData = {
        "type": "order",
        "head": {
            "BillNo": "YHC27001201707050001",
            "YhOrgCode": "C27001",
            "BillType": "0",
            "XsOrgCode": "C27001",
            "DeliverAddr": "送货地址",
            "YhrCode": "8888",
            "YhrName": "随机测试",
            "ComFlag": "1",
            "IsOLPromo": "0",
            "BillFrom": "3",
            "ZkTotal": "0",
            "Remark": "备注 我是测试的",
            "JzDate": ""
        },
        "body": [   
            ]
        }
    jsonDataBodyList = []
    jsonDataBody = {
                    "BillNo": "YHC27001201707050001",
                    "YhOrgCode": "C27001",
                    "BillType": "0",
                    "SerialNo": "88",
                    "PluCode": "00000049",
                    "Counts": "1728",
                    "Price": "0.7200",
                    "Total": "1244.1600",
                    "ItemCnt": "1",
                    "PriceStatus": "1",
                    "Remark": "备注 我是测试数据"
                }

    YHC = "YHC"+str(27001201811050001 + count)
    YhOrgCode = str(random.randint(1000,5500))
    jsonData["head"]["BillNo"] = YHC
    jsonData["head"]["YhOrgCode"] = YhOrgCode
    jsonData["head"]["JzDate"] = time.strftime("%Y-%m-%d", time.localtime())
    bodyListNum = random.randint(6,20)
    PluCodeList = ["00000049","60023299","60023317","00000000010","00000001","00000005","00000015","70073256","90036628","60023318"]
    i = 0
    while(i<bodyListNum):
        PluCodeListNum = random.randint(0,9)
        jsonDataBody["BillNo"] = YHC
        jsonDataBody["YhOrgCode"] = YhOrgCode
        jsonDataBody["PluCode"] = PluCodeList[PluCodeListNum]
        jsonDataBodyList.append(jsonDataBody)
        i = i+1
    jsonData["body"] = jsonDataBodyList

    setJson = json.dumps(jsonData,ensure_ascii=False)
    # data_list.append(setJson)
    print(setJson)

    p.produce("test8", setJson,callback=delivery_report)
    p.flush()
    count = count + 1
    time.sleep(6)
    

