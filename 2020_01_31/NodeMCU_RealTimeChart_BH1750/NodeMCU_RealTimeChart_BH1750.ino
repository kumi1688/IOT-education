
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <Hash.h>
#include <Wire.h>
#include <BH1750.h>
#include "DHT.h"
#define DHTPIN D4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;
const char* ssid = "RiatechE2G";
const char* password = "12345678";
const char* nodeName = "Factory-A-controller";

char* topic_light = "FA-0/Light";
char* topic_temp = "FA-0/Temperature";
char* topic_humidity = "FA-0/Humidity";
char* topic_all = "FA-0/All";

char* broker_server = "192.168.64.25";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

WiFiClient wifiClient;
PubSubClient client(broker_server, 1883, wifiClient);

String readBHLightLevel(){
  float lux = lightMeter.readLightLevel();
  Serial.println(lux);
  return String(lux);
}

String read_Temperature(){
  float t = dht.readTemperature();
  if(isnan(t)){
    Serial.println("Failed to read Temperature");
    return String(-100);
  }
  return String(t);
}

String read_Humidity(){
  float h = dht.readHumidity();
  if(isnan(h)){
    Serial.println("Failed to read Humidity");
    return String(-100);
  }
  return String(h);
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(9600);
  Wire.begin();

  //조도 및 온도 센서 시작
  lightMeter.begin();
  dht.begin();
  
  // Initialize SPIFFS 
  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  while(!client.connect(nodeName)){
    Serial.print("."); delay(1000);
  }
  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());
  
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html","text/html");
  });
  
  server.on("/lightlevel", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readBHLightLevel().c_str());
  });
  server.begin();
}
 
void loop(){
  //client.loop();
  char dataSet[100];
  strcpy(dataSet, readBHLightLevel().c_str());
  strcat(dataSet, ",");
  strcat(dataSet, read_Temperature().c_str());
  strcat(dataSet, ",");
  strcat(dataSet, read_Humidity().c_str());
  

  client.publish(topic_all, dataSet);
  client.publish(topic_light, readBHLightLevel().c_str());
  client.publish(topic_temp, read_Temperature().c_str()); 
  client.publish(topic_humidity, read_Humidity().c_str());
  delay(1000);
}
