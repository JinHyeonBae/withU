from os import error
from flask import Blueprint,request,make_response, jsonify
from flask.templating import render_template
from urllib.parse import urlencode

from ..module.analyzeSentence import analyzeSentence as analyze
from ..module.dialogflow import connect

import urllib3
import requests
import json

from werkzeug.datastructures import Headers



bp = Blueprint('main' ,__name__, url_prefix='/')


@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/query', methods=['POST'])
def webhookProcess():
    req = request.form['content'] # data

    sentence = analyze(req)
    dia = connect(req)

    return render_template('result.html', res=sentence)
