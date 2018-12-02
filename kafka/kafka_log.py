#coding=utf-8

from confluent_kafka import Consumer, KafkaError
import json
import MySQLdb
import logging
import logging.config

logging.config.fileConfig("./logging.conf")
logger = logging.getLogger("kafka_log")

c = Consumer({
    "bootstrap.servers": "118.24.53.99:9092",
    "group.id": "group",
    'default.topic.config': {
        'auto.offset.reset': 'earliest'
    }
})

c.subscribe(['kafkalogs'])

db = MySQLdb.connect("localhost", "root", "123456", "test_kafka", charset='utf8')
cursor = db.cursor()

sql = "INSERT into kafka_logs(logDate,logTime,logLevel,logDescribe,content,deliveryCode,billNo,type) VALUES ( '%s','%s','%s','%s','%s','%s','%s','%s' )"

while True:
    msg = c.poll()
    if msg is None:
        continue
    if msg.error():
        if msg.error().code() == KafkaError._PARTITION_EOF:
            continue
        else:
            logger.error("msg错误 ："+msg.error().encode("utf-8"))
            break

    insertData = json.loads(msg.value())

    insertSql = sql % (insertData["logDate"],insertData["logTime"],insertData["level"],insertData["describe"],insertData["content"],insertData["deliveryCode"],insertData["billNo"],insertData["type"])
    
    try:
        cursor.execute(insertSql.encode("utf-8"))
        db.commit()
    except Exception,err:
        logger.error("插入错误 ："+insertSql.encode("utf-8")+" 错误 "+ err)
        db.rollback()
        continue

    logger.info("插入成功 ："+msg.value())

c.close()