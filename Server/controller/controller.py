from flask.globals import request
from requests.api import head
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen

import requests
import json
import uuid
import os
import urllib3
from queue import Queue

from requests import exceptions

import sys
sys.path.append('/home/jetson/Desktop')

from service.eval import evaluation

#sys.path.append("C:\\Users\\BJH\\Desktop\\21_withU")

class controller :

    def __init__(self):
        self.dataQueue = Queue()
        self.nlp = evaluation()
        self.botMsg = ""
        # self.nlp = NLP()

    def prepareToEval(self):
        self.nlp.read()


    def send(self, data):
        self.prepareToEval()
        self.botMsg = self.nlp.evaluated(data)
        

    def update(self):
        if self.dataQueue.empty() is False:
            data = self.dataQueue.get()
            self.send(data)

    def frame(self,user_req):
        pass

    def notify(self):
        pass

    def set(self, user_req):  
        self.dataQueue.put(user_req)
    
    def get(self):
        return self.botMsg