#include "DHT.h"
#define DHTPIN D4
#define DHTTYPE DHT22

#include <Wire.h>
#include <BH1750.h>

DHT dht(DHTPIN, DHTTYPE);

BH1750 lightMeter;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();

  Wire.begin();
  lightMeter.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);
  float lux;
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if(isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("humidity: "); Serial.print(h);
  Serial.print("\t");
  Serial.print("Temperature: "); Serial.print(t);
  Serial.print("*C");
  Serial.print("\t");
  lux = lightMeter.readLightLevel();
  Serial.print("Light: "); Serial.print(lux);
  Serial.println("lx");
}
