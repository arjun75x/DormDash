import requests
import random
import time
import datetime
from requests.auth import HTTPBasicAuth
import numpy as np

queueBF_url = 'http://localhost:3000/dev/queueBF'
attemptAdmit_url = 'http://localhost:3000/dev/admit'
admitArrive_url = 'http://localhost:3000/dev/admit/arrive'
admitLeave_url = 'http://localhost:3000/dev/admit/leave'
current_time = int(time.time())

for dining_hall_choice in ["FAR", "Ike", "ISR", "LAR"]:
    for i in range(50):
        queue_group = list(set(random.choices(["tincher2", "arjunsa2", "naymanl2", "ajhsu2"], k=random.randint(1,4))))
        random_distribution = np.random.uniform(0, (7 * 24 * 60 * 60))
        random_time = (datetime.datetime.now() - datetime.timedelta(seconds=random_distribution)).isoformat()
        auth = ("DeveloperOnly", "arjunsa2")
        body1 = {
            "DiningHallName": dining_hall_choice,
            "QueueGroup": queue_group,
            "joinTime": random_time
        }

        body2 = {
            "NetID": queue_group[0]
        }
        requests.post(queueBF_url, json=body1, auth=auth)
        requests.post(attemptAdmit_url, json=body2, auth=auth)
        requests.post(admitArrive_url, json=body2, auth=auth)
        requests.post(admitLeave_url, json=body2, auth=auth)