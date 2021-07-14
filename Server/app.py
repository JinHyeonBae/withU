from flask import Flask
from google.cloud import dialogflow
import os
app = Flask(__name__)
from .connect import readKeyfile


@app.route("/", methods=('POST','GET'))
def listenRequest(request, response):



if __name__ == '__main__' :
    port = int(os.getenv('PORT', 4000))
    print(port)
    app.run(debug=True,  host='0.0.0.0',port=port)