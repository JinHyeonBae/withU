from flask import Flask, request, url_for, Blueprint
from flask.templating import render_template
import pymongo
from werkzeug.utils import redirect


from .views import main_views

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main_views.bp)
    return app
    
if __name__ == '__main__' :
    app = create_app()
    app.run()