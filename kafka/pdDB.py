#coding:utf-8

import MySQLdb

db = MySQLdb.connect("localhost", "root", "123456", "test_kafka", charset='utf8' )
cursor = db.cursor()

# sql = "INSERT INTO DBtest(test) VALUES('cc')"
sql = "SELECT * FROM DBtest;"

try:
   # 执行sql语句
   cursor.execute(sql.encode("utf-8"))
   results = cursor.fetchall()

   print(results)
   db.commit()
except:
   db.rollback()

db.close()