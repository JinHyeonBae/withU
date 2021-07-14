
import sys
import os
import json

keyfile = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]

def readKeyfile() :
    with open(keyfile, 'r') as f:
        json_data = json.load(f)
    
    data = json.dumps(json_data["project_Id"])
    return data


def webhookResponse (text):
    print(text)