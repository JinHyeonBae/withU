import json
import requests
import os


url = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"
filepath = '.json'

def analyzeSentence(req):

    with open(filepath, "r") as f :
        accessKey = json.load(f)

    analysisCode = "morp"
    text = req

    requestJson = {
        "access_key": accessKey['key'],
        "argument": {
            "text": text,
            "analysis_code": analysisCode
        }
    }
 
    headers = {"Content-Type": "application/json; charset=utf-8", "Accept" : "application/json"}
    data = json.dumps(requestJson)

    try:
        response = requests.post(url, data=data, headers=headers, timeout=20)

        res = response.json() #res는 object
        return_object = res['return_object']
        
        sentence = return_object['sentence'][0]
        #print(sentence['morp'])
            
    except requests.exceptions.ReadTimeout : 
        print("Server didn't respond within 10 seconds")

    return sentence