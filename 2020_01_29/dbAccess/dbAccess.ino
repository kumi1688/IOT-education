#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>
#include <Wire.h>
#include <BH1750.h>

IPAddress serverAddr(192, 168, 64, 14);
char user[] = "nodeMCU";
char pass[] = "riatech";

const char* ssid = "RiatechE2G";
const char* password = "12345678";

WiFiClient client;
MySQL_Connection conn((Client*)&client);

#include "DHT.h"
#define DHTPIN D4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

BH1750 lightMeter;

char sql[100];
char sdateTime[30];

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", 9*3600, 60000);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    Serial.print("."); delay(500);
  }
  Serial.print("local Ip : "); Serial.println(WiFi.localIP());
  
  timeClient.begin();
  dht.begin();
  Wire.begin();
  lightMeter.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);
  float lux = lightMeter.readLightLevel();
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if(isnan(h) || isnan(t) ) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if(isnan(lux)){
    Serial.println("Failed to read from BH1750 sensor!");
    return;
  }

  timeClient.update();
  String date_time = timeClient.getFormattedDate();
  int index_date = date_time.indexOf("T");
  String date = date_time.substring(0, index_date);
  date_time = date + " " + timeClient.getFormattedTime();
  date_time.toCharArray(sdateTime, 30);
  
  Serial.println(sdateTime);
  Serial.print("humidity: "); Serial.print(h);
  Serial.print("\t");
  Serial.print("Temperature: "); Serial.print(t);
  Serial.print("*C");
  Serial.print("\t");
  
  Serial.print("Light: "); Serial.print(lux);
  Serial.println("lx");
  

  sprintf(sql, "insert into dbsensor.tbsensor values ('%s', %f, %f, %f);", sdateTime, lux, t, h);
  Serial.println(sql);

  if(conn.connect(serverAddr, 3306, user, pass)){
    delay(1000);
  } else{
    Serial.println("Connection failed");
  }
  Serial.println("recording Data");
  MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
  cur_mem->execute(sql);
  delete cur_mem;
}
