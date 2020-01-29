#include <ESP8266WiFi.h>

const char* ssid = "RiatechE2G";
const char* password = "12345678";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  Serial.print("\nconnecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWiFi connected");

  Serial.print("Local IP address : ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:

}
