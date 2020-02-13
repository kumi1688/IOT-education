#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "RiatechE2G";
const char* password = "12345678";
const char* nodeName = "Factory-A-0";

char* topicSub = "FA-0/Led"; // #로 하면 모든 토픽을 수신
char* topicPub = "FA-0/Temp"; 
char* server = "192.168.64.25"; //MQTT broker address
char message_buff[100]; 
char data[10];  
void callback(char* topic, byte* payload, unsigned int length) {
  int i = 0, ledState; 
  //create character buffer with ending null terminator (string)
  for(i=0; i<length; i++){
    message_buff[i] = payload[i];
  }
  message_buff[i]= '\0';
    
  String msgString = String(message_buff);
  Serial.println("Payload: "+ msgString);
  
  //전송된 메시가 "on"이면 LED를 On, "on" 아니면 LED off
  ledState = (msgString == "on") ? HIGH : LOW;
  digitalWrite(D0, ledState);
}

WiFiClient wifiClient; 
PubSubClient client(server, 1883, callback, wifiClient);

void setup() {
  Serial.begin(9600);
  pinMode(D0, OUTPUT);
  WiFi.begin(ssid, password);
  while ( WiFi.status() != WL_CONNECTED ) {
    Serial.print(".");  delay(500);
  }
  
  while ( !client.connect(nodeName) ){ 
    Serial.print(".");  delay(1000);
  }
  client.subscribe(topicSub);
}

void loop() {
  client.loop(); 
  float temperature = 100.0*(analogRead(A0) * 3.3/1024.0) - 50.0;
  String Str = String(temperature);
  Str.toCharArray(data, Str.length());
  client.publish(topicPub, data);
  delay(2000);
}
