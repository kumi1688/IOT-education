import paho.mqtt.client as mqtt
import pymysql
import time

rasp_ip = "192.168.64.25"

conn = pymysql.connect(host='localhost', user='root', password='ajoumysql123!', db='dbsensor')

def on_connect(client, userdata, flags, rc):
    print("Connect with result code " + str(rc))
    client.subscribe("FA-0/Light")
    client.subscribe("FA-0/Temperature")
    client.subscribe("FA-0/Humidity")

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    
    curs = conn.cursor()
    sql = ""
    
    if(msg.topic == 'FA-0/Temperature'):
        sql = "insert into temperature values (\'%s\', %f);"
    elif (msg.topic == 'FA-0/Humidity'):
        sql = "insert into humidity values (\'%s\', %f);"
    else: # msg.topic == "FA-0/Light"
        sql = "insert into light values (\'%s\', %f);"

    #if(light != -100.0 and humi != -100.0 and temp != -100.0 ):
        #sql = "insert into tbsensor values (\'%s\', '%f, %f, %f);"
        #print(sql)
        #sql2 = sql % (getTime(), light, temp, humi)
        #print(sql2)
        #light = temp = humi = -100
        #curs.execute(sql2)
        #conn.commit()
    #else:
    #  return
        
    #print(sql % (getTime(), round(float(msg.payload), 2)))
    sql2 = sql % (getTime(), round(float(msg.payload), 2))
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
