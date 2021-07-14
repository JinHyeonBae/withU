import urllib
import json
import os
import dialogflow
from .connect import readKeyFile
sessonclient = dialogflow.SessionClient()

def webhookProcess():
    pj = readKeyFile()

    


