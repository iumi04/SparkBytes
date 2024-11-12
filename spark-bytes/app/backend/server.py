from pymongo import MongoClient
from flask import Flask, jsonify
import certifi


MONGO_URI = "mongodb+srv://pranitd23:rg4s4CiRNiF9P8BT@cluster0.ixopq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  


client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

db = client["sparkbytes"]

collection = db["sample1"]

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/data", methods=["GET"])
def get_data():

    data = list(collection.find({}, {"_id": 0}))  
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
