from flask import Flask, request, url_for
from flask.templating import render_template
from google.cloud import dialogflow
from werkzeug.utils import redirect
from .connect import readKeyfile
from .DetectIntent import webhookProcess
from google.oauth2 import service_account

import json
import os
import uuid
import requests

sessionId = uuid.uuid4()
app = Flask(__name__)
url = 'http://localhost:5000/'
credentials = service_account.Credentials.from_service_account_file(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])


@app.route("/")
def listenRequest():
    return render_template('index.html')

@app.route('/query', methods=['post'])
def webhookProcess():
    # get PostData
    req = request.form['content']
    
    print("req :",type(req))
    pj_id = readKeyfile()
    
    session_client = dialogflow.SessionsClient(credentials=credentials)

    session = session_client.session_path(pj_id, sessionId)
    print("session path :{}\n".format(session))

    query_input ={
        'text' :{
            "text" : req,
            "language_code" : "ko"
        }
    }
    
    queryRequest = dialogflow.DetectIntentRequest(
        session = session,
        query_input = query_input
    )
    print("queryRequest: ",queryRequest)
    response = session_client.detect_intent(request=queryRequest)
    
    
    print("res :", response)

    return response



if __name__ == '__main__' :
    port = int(os.getenv('PORT', 4000))
    print(port)
    app.run(debug=True,  host='0.0.0.0',port=port)