#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
//#include <MySQL_Connection.h>
//#include <MySQL_Cursor.h>

//IPAddress serverAddr(192, 168, 64, 14);
//char user[] = "nodeMCU";
//char pass[] = "riatech";

const char* ssid = "RiatechE2G";
const char* password = "12345678";


//WiFiClient client;
//MySQL_Connection conn((Client*)&client);

//char sql[] = "insert into dbsdata.tbCustomer values (7, \"Number 7\");";


WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", 9*3600, 60000);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print("."); delay(500);
  }
  Serial.print("IP Address : "); Serial.println(WiFi.localIP());
  
  timeClient.begin();
  
}

void loop() {
  // put your main code here, to run repeatedly:
  timeClient.update();
  String date_time = timeClient.getFormattedDate();
  int index_date = date_time.indexOf("T");

  String date = date_time.substring(0, index_date);

  date_time = date + " " + timeClient.getFormattedTime();
  Serial.println(date_time);

  delay(1000);
}
