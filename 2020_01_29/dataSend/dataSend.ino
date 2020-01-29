#include <ESP8266WiFi.h>
#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>

IPAddress serverAddr(192, 168, 64, 14);
char user[] = "nodeMCU";
char pass[] = "riatech";

const char* ssid = "RiatechE2G";
const char* password = "12345678";

char sql[] = "insert into dbsdata.tbCustomer values (7, \"Number 7\");";
WiFiClient client;
MySQL_Connection conn((Client*)&client);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print("."); delay(500);
  }
  Serial.print("IP Address : "); Serial.println(WiFi.localIP());

  if(conn.connect(serverAddr, 3306, user, pass)){
    delay(1000);
  } else {
    Serial.println("Connection failed");
  }

  Serial.println("recodring data");
  MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
  cur_mem->execute(sql);
  delete cur_mem;
}

void loop() {
  // put your main code here, to run repeatedly:

}
