import paho.mqtt.publish as publish

publish.single("hello/world", "34.4", hostname="localhost")
