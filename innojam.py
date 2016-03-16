from flask import Flask, render_template
import pyhdb

app = Flask(__name__)
app.config["DEBUG"] = True
# connection = pyhdb.connect(host="172.20.40.16", port=30015, user="TEAM20_USER01", password="c35vfdE0ivk6553")


@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/db')
def db():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM TEAM20_USER01.TEST")
    result = cursor.fetchone()
    if result:
        return result
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

if __name__ == '__main__':
    app.run()