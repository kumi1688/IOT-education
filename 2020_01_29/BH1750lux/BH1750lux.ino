#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Wire.begin();
  lightMeter.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println("lx");
  delay(1000);

}
