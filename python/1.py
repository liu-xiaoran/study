# coding=utf8
import time
i=0
lock = True
while lock:
    i+=1
    time.sleep(0.2)
    print("自动生成{}".format(i))
    if i>66:
        lock = False
