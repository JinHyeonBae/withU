from flask import Flask, request, url_for, Blueprint
from flask.templating import render_template
from werkzeug.utils import redirect

import os
import sys
import pdb
import logging
import traceback
import time

# sys.path.append("C:\\Users\\BJH\\Desktop\\21_withU")

from controller.controller import controller
from network.socketServer import socketServer

from Server.service.Decoder import AttnDecoderRNN
from Server.service.Encoder import EncoderRNN
from Server.service.Lang import Lang

import threading

app = Flask(__name__)


if __name__ == '__main__' :

    serverSocket = socketServer()
    
    controlObject = controller()
    
    serverSocket.listen()
    serverSocket.accept()

    deadline = time.time() + 20.0

    while True:
        try:   
            serverSocket.receive()

            # user 발화
            sentence = serverSocket.get()
            print("user:", sentence)

            if sentence in ["살려줘", "사람 살려", "살려"] :
                controlObject.notify()

            controlObject.set(sentence)   
            controlObject.update()

            while controlObject.get() == "":
                time.sleep(1)

            result = controlObject.get()
            print("받은 메시지 :", result)
            serverSocket.set(result)
            serverSocket.send()

        except Exception as e:
            print("Error!")
            print(traceback.format_exc())
    

    