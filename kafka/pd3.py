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

    YHC = "YHC27001"+str(int(time.time())+count)
    # YHC = "YHC27001201707050001"
    
    YhOrgCode = str(random.randint(1000,5500))
    jsonData["head"]["BillNo"] = YHC
    jsonData["head"]["YhOrgCode"] = "0006"
    jsonData["head"]["JzDate"] = time.strftime("%Y-%m-%d", time.localtime())
    bodyListNum = random.randint(6,20)
    # bodyListNum = 1
    PluCodeList = ["00000049","60023299","60023317","00000000010","00000001","00000005","00000015","70073256","90036628","60023318","10065681","00000026","00001610","00009440","10017996","10012213","27001000046","00000019","00000021","00000028","00000057"]
    i = 1
    while(i<bodyListNum):
        PluCodeListNum = random.randint(0,9)
        jsonDataBody["BillNo"] = YHC
        jsonDataBody["YhOrgCode"] = YhOrgCode
        jsonDataBody["PluCode"] = PluCodeList[i]
        jsonDataBody["Counts"] = i
        jsonDataBodyList.append(copy.deepcopy(jsonDataBody))
        i = i+1
    jsonData["body"] = jsonDataBodyList

    setJson = json.dumps(jsonData,ensure_ascii=False)
    # data_list.append(setJson)
    print(setJson)
    print(count)

    p.produce("test", setJson,callback=delivery_report)
    p.flush()
    count = count + 1
    # time.sleep(1)
    

# for data in data_list:

    # p.produce("test", data.encode("utf-8"),callback=delivery_report)
    # p.produce("test", data,callback=delivery_report)

