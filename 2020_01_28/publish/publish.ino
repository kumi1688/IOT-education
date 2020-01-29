#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "DHT.h"
#define DHTPIN D4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

const char *ssid = "RiatechE2G";
const char *password = "12345678";
const char *nodeName = "Factory-A-O";

char *topic_temp = "A/temp";
char *topic_humidity = "A/humidity";
char *server = "192.168.64.14";

WiFiClient wifiClient;
PubSubClient client(server, 1883, wifiClient);
char data[20];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    Serial.print("."); delay(500);
  }

  Serial.println("\nWiFi Connected");

  while(!client.connect(nodeName)){
    Serial.print("."); delay(1000);
  }
  Serial.println("\nConnected to broker");
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);
  float h = dht.readHumidity();
  float temperature = dht.readTemperature();

  if(isnan(h) || isnan(temperature)){
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Temp : ");
  Serial.print(temperature);
  Serial.print(" Humidity : ");
  Serial.println(h);

  String Str = String(temperature);
  String Str2 = String(h);
  Str.toCharArray(data, Str.length());
  client.publish(topic_temp, data);
  Str2.toCharArray(data, Str2.length());
  client.publish(topic_humidity, data);
}
