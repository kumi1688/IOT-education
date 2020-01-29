#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char *ssid = "RiatechE2G";
const char *password = "12345678";

const char *nodeName = "Factory-A-O";
char* server = "192.168.64.14";

WiFiClient wifiClient;
PubSubClient client(server, 1883, wifiClient);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWifi Connected");
  Serial.print("Local IP address : ");
  Serial.println(WiFi.localIP());

  Serial.print("Connecting to broker");
  while(!client.connect(nodeName)){
    Serial.print("*");
    delay(1000);
  }
  Serial.println("\nConnected to broker");
}

void loop() {
  // put your main code here, to run repeatedly:

}
