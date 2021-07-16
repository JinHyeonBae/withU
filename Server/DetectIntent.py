from logging import error
import urllib
import json
import os
import uuid
from flask import request, make_response, jsonify 
#setup.py가 뭐지
from google.cloud import dialogflow
from google.cloud.dialogflow_v2.types import intent
from .connect import readKeyfile

sessionId = uuid.uuid4() 


def webhookProcess():
    pj_id = readKeyfile()
    print(pj_id)
    
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(pj_id, sessionId)
    print("session path :{}\n".format(session))

