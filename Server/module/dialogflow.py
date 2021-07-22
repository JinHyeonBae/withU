from google.cloud import dialogflow

from ..key.flowKey import readKeyfile

import uuid
import os

sessionId = uuid.uuid4()

def connect(req) :

    pj_id = readKeyfile()
    
    
    session_client = dialogflow.SessionsClient.from_service_account_json(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    print(type(pj_id))
    session = session_client.session_path(pj_id, sessionId)
    print("session path :{}\n".format(session))

    query_input ={
        'text' :{
            "text" : req,
            "language_code" : "ko"
        }
    }
    
    queryRequest = dialogflow.DetectIntentRequest(
        session = 'projects/"withu-tyos"/agent/sessions/0ec6f4b8-5ca9-4fd6-b6b5-bf2d31dc3d53',
        query_input = query_input
    )
    print("queryRequest: ",queryRequest)
    response = session_client.detect_intent(request=queryRequest)
