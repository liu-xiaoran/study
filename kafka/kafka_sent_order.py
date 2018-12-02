#coding=utf-8
from confluent_kafka import Producer
import MySQLdb
import json
import time
import logging
import logging.config

logging.config.fileConfig("./logging.conf")
logger = logging.getLogger("kafka_sent")

p = Producer({"bootstrap.servers": "118.24.53.99:9092"})

db = MySQLdb.connect("localhost", "root", "123456", "test_kafka", charset='utf8' )
cursor = db.cursor()

querySql = "SELECT * FROM order_kafka_msg WHERE `status` = 0;"
updataSql = "UPDATE order_kafka_msg SET `status` = 0,sent_at = CURRENT_TIMESTAMP WHERE id = %d ;"

resultId = None

def delivery_report(err, msg):
    if err is not None:
        logger.error('Message delivery failed: {}'.format(err))
    else:
        execSql = updataSql % (resultId)
        try:
            cursor.execute(execSql.encode("utf-8"))
            db.commit()
        except Exception,err:
            logger.error('更新status失败 ' +execSql +"错误："+ err)
            db.rollback()
        logger.info('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))



while (True):
    cursor.execute(querySql.encode("utf-8"))
    results = cursor.fetchall()
    for result in results:
        resultId = result[0]
        topic_name = result[6]
        msg_body = result[7]
        p.produce(topic_name,msg_body.encode("utf-8"),on_delivery=delivery_report)

    p.flush()
    time.sleep(60)
    

