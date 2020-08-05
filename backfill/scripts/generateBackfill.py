import requests
import random
import time
import datetime
from requests.auth import HTTPBasicAuth

url = 'http://localhost:3000/dev/queueBF'
current_time = int(time.time())

for i in range(5):

    body = {
        "DiningHallName": random.choice(["FAR", "Ike", "ISR", "LAR"]),
        "QueueGroup": random.choices(["tincher2", "arjunsa2", "naymanl2", "ajhsu2"], k=random.randint(1,4)),
        "joinTime": (datetime.datetime.now() - datetime.timedelta(seconds=random.randint(0, (7 * 24 * 60 * 60)))).isoformat()
    }
    x = requests.post(url, json=body, auth=("DeveloperOnly", "arjunsa2"))
    print(x.json())