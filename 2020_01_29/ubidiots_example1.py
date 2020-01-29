import time, requests, math, random
TOKEN = "BBFF-AVtACEcQP8q0fQqnWnw3C5Nub1qm6B"
DEVICE_LABEL = "datamachine"
VARIABLE_LABEL = "temp"

def post_request(payload):
    url = "http://industrial.api.ubidots.com"
    url = "{}/api/v1.6/devices/{}".format(url, DEVICE_LABEL)
    headers = {"X-Auth-Token": TOKEN, "Content-Type": "application/json"}
    status = 400
    attempts = 0
    while status >= 400 and attempts <= 5:
        req = requests.post(url=url, headers=headers, json=payload)
        status = req.status_code
        attempts += 1
        time.sleep(1)

    if status >= 400:
        print("[ERROR] could not send data after 5 attempts, pleas check\
            your token credentials and interrnet connection")
        return False

    print("[INFO] reqruest made propely, your device is updated")
    return True

while True:
    variable = random.randint(0, 100)
    payload = {VARIABLE_LABEL: variable}
    print("[INFO] attempting to send data")
    post_request(payload)
    print("[INFO] finished")
    time.sleep(5)
