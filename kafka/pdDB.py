#coding:utf-8

import MySQLdb
import json

db = MySQLdb.connect("localhost", "root", "123456", "test_kafka", charset='utf8' )
cursor = db.cursor()

# sql = "INSERT INTO DBtest(test) VALUES('cc')"
sql = "SELECT msg_body FROM order_kafka_msg;"

try:
   # 执行sql语句
   cursor.execute(sql.encode("utf-8"))
   results = cursor.fetchall()

   for result in results:
         print("------------------")
         print(json.dumps(json.loads(result[0]),ensure_ascii=False))
         

   db.commit()
except:
   db.rollback()

db.close()