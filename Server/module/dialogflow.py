from google.auth import credentials
from google.cloud import dialogflow

from ..key.flowKey import readKeyfile
from google.oauth2 import service_account

import uuid
import os

sessionId = uuid.uuid4()
SERVICE_ACCOUNT_FILE = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]

def connect(req) :

    credential = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)

    data = readKeyfile()

    session_client = dialogflow.SessionsClient(credentials=credential)
    session = session_client.session_path(data, sessionId)
    print("session path :{}\n".format(session))

    query_input ={
        'text' :{
            "text" : req,
            "language_code" : "ko"
        }
    }

    
    queryRequest = dialogflow.DetectIntentRequest(
        session = session,
        query_input = query_input,
    )
    print("queryRequest: ",queryRequest)

    try: 
        response = session_client.detect_intent(request=queryRequest)
        print(response)
    except Exception as e:
        s = str(e)
        print(s)
