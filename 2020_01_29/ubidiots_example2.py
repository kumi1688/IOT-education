import time, requests, math, random
TOKEN = "BBFF-AVtACEcQP8q0fQqnWnw3C5Nub1qm6B"
DEVICE_LABEL = "datamachine"
VARIABLE_LABEL = "node-a"

def get_var(device, variable):
    try: 
        url = "http://industrial.api.ubidots.com/"
        url = url + "api/v1.6/devices/{0}/{1}/".format(device, variable)
        print(url)
        headers = {"X-Auth-Token": TOKEN, "Content-Type": "application/json"}
        req = requests.get(url=url, headers=headers)
        return req.json()['last_value']['value']
    except:
        pass

while True:
    NodeA_Enable = get_var(DEVICE_LABEL, VARIABLE_LABEL)
    if NodeA_Enable:
        print('Node A Enable')
    else:
        print('Node A Disable')
    time.sleep(2)
