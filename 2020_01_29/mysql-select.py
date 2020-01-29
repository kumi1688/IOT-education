import pymysql

conn = pymysql.connect(host='localhost', user='kang', password='1234', db='dbsdata')
try:
    curs = conn.cursor()
    sql = "select * from tbCustomer"
    curs.execute(sql)
    data = curs.fetchall()
    print(data)
finally:
    conn.close()
