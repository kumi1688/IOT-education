#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "RiatechE2G";
const char* password = "12345678";
const char* nodeName = "Factory-A-0 Device";

char* topic_temp = "Factory-A-0/TEMP";
char* topic_led = "Factory-A-0/LED";
char* server = "192.168.64.25";
char data[10];
char message_buff[100];

void callback_led(char* topic, byte* payload, unsigned int length){
    int i, ledState;
    
    for(i = 0; i < length; i++){
        message_buff[i] = payload[i];
    }
    
    message_buff[i] = '\0';


    String msgString = String(message_buff);
    //Serial.println("payload :" + msgString);

    ledState = (msgString == "on") ? HIGH : LOW;
    digitalWrite(D0, ledState);    
}

void callback_temp(char* topic, byte* payload, unsigned int length){
    int i;
    
    for(i = 0; i < length; i++){
        message_buff[i] = payload[i];
    }
    
    message_buff[i] = '\0';


    String msgString = String(message_buff);
    Serial.println("temp :" + msgString);
}



WiFiClient wifiClient;
PubSubClient client_led(server ,1883, callback_led, wifiClient);
PubSubClient client_temp(server ,1883, callback_temp, wifiClient);

void setup(){
    Serial.begin(9600);
    pinMode(D0, OUTPUT);
    WiFi.begin(ssid, password);
    while(WiFi.status() != WL_CONNECTED){
        Serial.print("."); delay(500);
    }

    while(!client_temp.connect(nodeName) && !client_led.connect(nodeName)){
        Serial.print("."); delay(1000);
    }

    client_led.subscribe(topic_led);
    client_temp.subscribe(topic_temp);
}

void loop(){
    client_led.loop();
    client_temp.loop();
    
    float temperature = 100.0*(analogRead(A0) * 3.3/1024.0) - 50.0;
    String Str = String(temperature);
    Str.toCharArray(data, Str.length());

    client_led.publish(topic_led, "on");
    delay(2000);
    client_led.publish(topic_led, "off");
    client_temp.publish(topic_temp, data); 
}
