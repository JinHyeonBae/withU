from os import error
from flask import Blueprint,request,make_response, jsonify
from flask.templating import render_template
from urllib.parse import urlencode

from ..controller import controller
from ..model.findData import findData

import urllib3
import requests
import json

from werkzeug.datastructures import Headers
from flask_pymongo import PyMongo


bp = Blueprint('main' ,__name__, url_prefix='/')

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/query', methods=['POST'])
def webhookProcess():
    req = request.form['content'] # data

    procession = controller.controller()
    emotion = findData()
    
    sentence = procession.analyze(req)
    emo = emotion.emotion(req)
    print("emotion :",emo)
    
    procession.crawling('부산 남구')

    return render_template('result.html', res=sentence)
