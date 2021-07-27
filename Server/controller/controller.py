from google.cloud import dialogflow
from google.oauth2 import service_account
from bs4 import BeautifulSoup as bs

import requests
import json
import uuid
import os

from ..service.manufactor import manufacture
from ..key.Keys import key

sessionId = uuid.uuid4()
SERVICE_ACCOUNT_FILE = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]


class controller : 

    def __init__(self):
        self.url = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"
        self.analysisCode = "morp"
    
    def analyze(self,user_req):
        
        keys = key()
        accessKey = keys.openApiKey()

        requestJson = {
            "access_key": accessKey['key'],
            "argument": {
                "text": user_req,
                "analysis_code": self.analysisCode
            }
        }

        headers = {"Content-Type": "application/json; charset=utf-8", "Accept" : "application/json"}
        data = json.dumps(requestJson)

        try:
            response = requests.post(self.url, data=data, headers=headers, timeout=20)

            res = response.json() #res는 object
            return_object = res['return_object']
            
            sentence = return_object['sentence'][0]
            #print(sentence['morp'])
                
        except requests.exceptions.ReadTimeout : 
            print("Server didn't respond within 10 seconds")

        return sentence


    def _dialogflow(self, user_req):
        
        credential = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)
        session_client = dialogflow.SessionsClient(credentials=credential)
        session = session_client.session_path('withu-tyos', sessionId)
        
        print("session path :{}\n".format(session))

        query_input ={
            'text' :{
                "text" : user_req,
                "language_code" : "ko"
            }
        }

        queryRequest = dialogflow.DetectIntentRequest(
            session = session,
            query_input = query_input
        )
        print("queryRequest: ", type(queryRequest))

        try: 
            response = session_client.detect_intent(request=queryRequest)
            print("1 :",response.query_result.fulfillment_text)
            print("2 :",type(response.query_result.fulfillment_text))
        
        except Exception as e:
            s = str(e)
            print("esc :",s)


    def crawling(self,address):
        html = requests.get('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query='+address+' 날씨')

        #html를 text로 변환 요청
        soup = bs(html.text, 'html.parser')
        data1 = soup.find('div', {'class' : 'weather_box'})
        find_address = data1.find('span', {'class':'btn_select'}).text
        print('현재 위치: '+find_address)

        find_currenttemp = data1.find('span',{'class': 'todaytemp'}).text
        print('현재 온도: '+find_currenttemp+'℃')