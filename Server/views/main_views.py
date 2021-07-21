from os import error
from flask import Blueprint,request,make_response, jsonify
from flask.templating import render_template
from urllib.parse import urlencode

import requests
import json

from werkzeug.datastructures import Headers

url = "http://aiopen.etri.re.kr:8000/WiseNLU"


bp = Blueprint('main' ,__name__, url_prefix='/')


@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/query', methods=['POST'])
def webhookProcess():
    req = request.form['content'] # data

    # 경로를 적어주지 않아도 괜찮은가?
    with open("key.json", "r") as f :
        accessKey = json.load(f)

    analysisCode = "ner"
    text = "안녕하세요"

    requestJson = {
        "access_key": accessKey['key'],
        "argument": {
            "text": text,
            "analysis_code": analysisCode
        }
    }
 
    headers = {"Content-Type": "application/json; charset=utf-8", "Accept" : "application/json"}
    data = json.dumps(requestJson)

    try:
        response = requests.post(url, data=data, headers=headers, timeout=20)

        print(dir(response))

        print("response_status :", response.status_code)
        print("response text :", response.text)
        print("response content :", response.content)

    except requests.exceptions.ReadTimeout : 
        print("Server didn't respond within 10 seconds")
    
    return "test"