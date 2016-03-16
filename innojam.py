from flask import Flask, render_template, jsonify
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import pyhdb
import json
from database import db_session
from models import *
from navi_speech import ask_take

app = Flask(__name__)
app.config["DEBUG"] = True

admin = Admin(app, template_mode='bootstrap3')
admin.add_view(ModelView(Location, db_session))
admin.add_view(ModelView(Driver, db_session))
admin.add_view(ModelView(Tour, db_session))
#connection = pyhdb.connect(host="172.20.40.16", port=30015, user="TEAM20_USER01", password="c35vfdE0ivk6553")



@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/db')
def db():
    #cursor = connection.cursor()
    #cursor.execute("SELECT * FROM TEAM20_USER01.TEST")
    #result = cursor.fetchone()
    #if result:
    #   print result[0]
    #   return result
    return "No Results"

@app.route('/app')
def app_view():
    return render_template("app_view.html")

@app.route('/map')
def map_view():
    start = {"lat": 52.3795836, "lng": 9.6213878}
    end = {"lat": 52.41, "lng": 10.6368185}
    waypoints = [[52.4207803,9.696139]]
    return render_template("map_view.html", start_lat=start["lat"], start_lng=start["lng"], end_lat=end["lat"], end_lng=end["lng"], waypoints=waypoints)

@app.route('/ask/take/<name>')
def ask(name):
    if ask_take(name):
        return jsonify(take=True)
    else:
        return jsonify(take=False)


if __name__ == '__main__':
    app.run()