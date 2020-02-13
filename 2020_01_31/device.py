import time
import requests
import random

TOKEN="BBFF-cPx3kvozezEzXMZaXXHCFoieygdIxk“

DEVICE_LABEL = “raspberry“
VAR_LABEL = "Motion“

def build_payload(variable):        
   value = random.randint(0,1)
   print("value : {}".format(value))
   payload = { variable: value }        
   return payload

def post_request(payload):
   url = “http://industrial.api.ubidots.com”
   url = "{}/api/v1.6/devices/{}".format(url, DEVICE_LABEL)
   headers = {"X-Auth-Token": TOKEN, "Content-Type":"application/json"}
   status = 400
   attempts = 0

    while status >= 400 and attempts <= 5:
        req = requests.post(url=url, headers=headers, json=payload) 
        status = req.status_code
        attempts += 1
        time.sleep(1)
        if status >= 400:
            print("[ERROR] Could not send data after 5 attempts, \
                 please check your token credentials and internet connection")          
            return False

        print("[INFO] request made properly, your device is updated")
        return True

def main(): 
    payload = build_payload(VAR_LABEL)
    print("[INFO] Attempting to send data")
    post_request(payload)
    print("[INFO] finished")

if __name__ == '__main__’: 
   while(True):
      main()
      time.sleep(2)