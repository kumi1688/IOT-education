import pymysql
import matplotlib.pyplot as plt

connection= pymysql.connect(
    host = '192.168.64.14',
    user = 'nodeMCU',
    password = 'riatech',
    db = 'dbsensor')

cursor = connection.cursor()
sql = 'select * from tbsensor where DTime >= "2020-01-04 00:00:00"';
cursor.execute(sql)
result = cursor.fetchall()

for row in result:
    print(row)

connection.close()

lux = []
h = []
t = []

for sample in result:
    lux.append(sample[1])
    t.append(sample[2])
    h.append(sample[3])

plt.plot(lux)
plt.plot(h)
plt.plot(t)
plt.show()

