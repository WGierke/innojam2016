from flask import Flask, render_template
import pyhdb

app = Flask(__name__)
app.config["DEBUG"] = True
connection = pyhdb.connect(host="172.20.40.16", port=30015, user="TEAM20_USER01", password="c35vfdE0ivk6553")


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

if __name__ == '__main__':
    app.run()
