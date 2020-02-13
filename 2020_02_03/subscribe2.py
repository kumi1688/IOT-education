import paho.mqtt.client as mqtt
import pymysql
import time



rasp_ip = "192.168.64.25"

conn = pymysql.connect(host='localhost', user='root', password='ajoumysql123!', db='dbsensor')

def on_connect(client, userdata, flags, rc):
    print("Connect with result code " + str(rc))
    #client.subscribe("FA-0/Light")
    #client.subscribe("FA-0/Temperature")
    #client.subscribe("FA-0/Humidity")
    client.subscribe("FA-0/All")

def on_message(client, userdata, msg):
    #print(msg.topic + " " + str(msg.payload))
    #print(msg.payload)
    
    curs = conn.cursor()
    sql = ""

    li = str(msg.payload).split(',')

    arr = []
    #print(li)
    
    li[2] = li[2][0:4]
    li[0] = li[0][2:7]

    for item in li:
        item = float(item)
        arr.append(item)

    
        
    #print(arr)
    #arr[0] = 조도
    #arr[1] = 온도
    #arr[2] = 습도


    
    sql = "insert into tbsensor values (\'%s\', %f, %f, %f);"
    sql2 = sql % (getTime(), round(arr[0],2), round(arr[1],2), round(arr[2],2))
    
    curs.execute(sql2)
    conn.commit()

def getTime():
    t = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    return str(t)


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(rasp_ip, 1883, 60)
client.loop_forever()
