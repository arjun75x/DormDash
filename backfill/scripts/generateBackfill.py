import requests
import random
import time
import datetime
from requests.auth import HTTPBasicAuth
import numpy as np

queueBF_url = 'http://localhost:3000/dev/queueBF'
attemptAdmit_url = 'http://localhost:3000/dev/admitBF'
admitArrive_url = 'http://localhost:3000/dev/admit/arriveBF'
admitLeave_url = 'http://localhost:3000/dev/admit/leaveBF'
current_time = int(time.time())

# for dining_hall_choice in ["FAR", "Ike", "ISR", "LAR"]:
for i in range(5):
    queue_group = list(set(random.choices(["tincher2", "arjunsa2", "naymanl2", "ajhsu2"], k=random.randint(1,4))))
    # random_distribution = np.random.normal(0, (7 * 24 * 60 * 60))
    # random_time = (datetime.datetime.now() - datetime.timedelta(seconds=random_distribution)).isoformat()
    random_distribution = np.random.normal(0, (3 * 60 * 60))
    meal_end = datetime.timedelta(seconds=(8 * 60 * 60))
    # testing 8 PM ET to 5 PM ET
    random_time = (datetime.datetime.now() - meal_end - datetime.timedelta(seconds=random_distribution)).isoformat()

    auth = ("DeveloperOnly", "arjunsa2")
    body1 = {
        # "DiningHallName": dining_hall_choice,
        "DiningHallName": "LAR",
        "QueueGroup": queue_group,
        "joinTime": random_time
    }
    # I had to add more bodies because the schema for the BF routes are different
    body2 = {
        "NetID": queue_group[0],
        "admitTime": random_time
    }

    body3 = {
        "NetID": queue_group[0],
        "arriveTime": random_time
    }

    body4 = {
        "NetID": queue_group[0],
        "leaveTime": random_time
    }
    requests.post(queueBF_url, json=body1, auth=auth)
    requests.post(attemptAdmit_url, json=body2, auth=auth)
    time.sleep(1)
    requests.post(admitArrive_url, json=body3, auth=auth)
    requests.post(admitLeave_url, json=body4, auth=auth)