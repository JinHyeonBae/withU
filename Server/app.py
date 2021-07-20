from flask import Flask, request, url_for
from flask.templating import render_template
from werkzeug.utils import redirect
from .DetectIntent import webhookProcess

import json
import os
import uuid
import requests
from .__init__ import create_app

app = create_app() 

if __name__ == '__main__' :
    port = int(os.getenv('PORT', 4000))
    print(port)
    app.run(debug=True,  host='0.0.0.0',port=port)