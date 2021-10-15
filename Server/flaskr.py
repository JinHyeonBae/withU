from flask import Flask, request, url_for, Blueprint
from flask.templating import render_template
from werkzeug.utils import redirect

import os
import sys
import pdb
import logging
import traceback

# sys.path.append("C:\\Users\\BJH\\Desktop\\21_withU")

from controller.controller import controller
from network.socketServer import socketServer

from Server.service.Decoder import AttnDecoderRNN
from Server.service.Encoder import EncoderRNN

import threading

app = Flask(__name__)


if __name__ == '__main__' :

    controlObject = controller()
    serverSocket = socketServer()

    try:
        while True:
            serverSocket.accept()
            serverSocket.receive()

            # user 발화
            sentence = serverSocket.get()
            print("user:", sentence)
            if sentence in ["살려줘", "사람 살려", "살려"] :
                controlObject.notify()

            controlObject.set(sentence)    
            controlObject.update()

            result = controlObject.get()
            print(result)
            serverSocket.set(result)
            serverSocket.send()
            

    except Exception as e: 
        print("e :", e.args)
        print("error name:",type(e).__name__)
        print(traceback.format_exc())
        pass
    

    