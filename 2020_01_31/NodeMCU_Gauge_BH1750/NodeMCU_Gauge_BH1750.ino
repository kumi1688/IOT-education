
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
//#include <FS.h>
#include <Hash.h>
#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;
// Replace with your network credentials
const char* ssid = "RiatechE2G";
const char* password = "12345678";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

String readBHLightLevel(){
  float lux = lightMeter.readLightLevel();
  Serial.println(lux);
  return String(lux);
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(9600);
  Wire.begin();
  lightMeter.begin();
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
  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html","text/html");
  }); 
  server.on("/lightlevel", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readBHLightLevel().c_str());
  });
  // Start server
  server.begin();
}
 
void loop(){
  
}
