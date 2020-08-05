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

for day in range(7):
    for dining_hall_choice in ["FAR", "Ike", "ISR", "LAR"]:
        for i in range(50):
            queue_group = list(set(random.choices(["tincher2", "arjunsa2", "naymanl2", "ajhsu2"], k=random.randint(1,4))))
            # random_distribution = np.random.normal(0, (7 * 24 * 60 * 60))
            # random_time = (datetime.datetime.now() - datetime.timedelta(seconds=random_distribution)).isoformat()
            random_distribution = np.random.normal(0, (4 * 60 * 60))
            meal_end = datetime.timedelta(seconds=(2 * 60 * 60))
            # testing 8 PM ET to 5 PM ET
            random_timestamp = datetime.datetime.now() + datetime.timedelta(days=day) - meal_end - \
                datetime.timedelta(seconds=random_distribution)
            random_time = random_timestamp.isoformat()

            auth = ("DeveloperOnly", "arjunsa2")
            join_body = {
                "DiningHallName": dining_hall_choice,
                "QueueGroup": queue_group,
                "joinTime": random_time
            }
            # I had to add more bodies because the schema for the BF routes are different
            admit_body = {
                "NetID": queue_group[0],
                "admitTime": (random_timestamp + datetime.timedelta(minutes=1)).isoformat()
            }

            arrive_body = {
                "NetID": queue_group[0],
                "arriveTime": (random_timestamp + datetime.timedelta(minutes=5)).isoformat()
            }

            leave_body = {
                "NetID": queue_group[0],
                "leaveTime": (random_timestamp + datetime.timedelta(minutes=10)).isoformat()
            }
            requests.post(queueBF_url, json=join_body, auth=auth)
            requests.post(attemptAdmit_url, json=admit_body, auth=auth)
            requests.post(admitArrive_url, json=arrive_body, auth=auth)
            requests.post(admitLeave_url, json=leave_body, auth=auth)
