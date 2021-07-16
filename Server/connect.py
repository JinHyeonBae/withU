import sys
import os
import json

keyfile = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]

def readKeyfile() :

    with open(keyfile, 'r') as f:
        json_data = json.load(f)
    
    data = json.dumps(json_data["project_id"])
    print(data)
    return data
