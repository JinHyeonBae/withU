import json
import os

keyfile = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
keypath = "Server/key/openKey.json"
class key:

    def openApiKey(self) :
        
        with open(keypath, "r") as f :
            accessKey = json.load(f)
        
        return accessKey
    
    def dialogflowKey(self) :

        with open(keyfile, 'r') as f:
            json_data = json.load(f)

        # permission denied의 이유.
        # data = json.dumps(json_data['project_id'])

        data = json_data['project_id']
    
        return data
