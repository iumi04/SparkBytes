from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
import certifi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
import re
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

MONGO_URI = "mongodb+srv://pranitd23:2YXiehbHn1BAhYLX@cluster0.ixopq.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
loginInfo_db = client["logininfo"] 
loginInfo_collection = loginInfo_db["sparkbytes"]
events_db = client["events"]
events_collection = events_db["sparkbytes"]

app.config["JWT_SECRET_KEY"] = "nobucketsumi" 
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Server Running"

@app.route("/signup", methods=["OPTIONS", "POST"])
def signup():
    if request.method == "OPTIONS":
        response = jsonify({"msg": "Preflight OK"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200
    
    data = request.get_json()

    email = data["email"]
    username = data["username"]
    password = data["password"]
    role = data["role"]

    if not re.match(r"^[a-zA-Z0-9._%+-]+@bu\.edu$", email):
        return jsonify({"msg": "Only @bu.edu emails are allowed"}), 400

    if not data.get("username") or not data.get("password") or not data.get("email"):
        return jsonify({"msg": "Email and password are required"}), 400

    existing_user = loginInfo_collection.find_one({"username": username})
    if existing_user:
        return jsonify({"msg": "Username already exists"}), 400
    
    existing_email = loginInfo_collection.find_one({"email": email})
    if existing_email:
        return jsonify({"msg:" "Email is being used by another account"}), 400

    hashed_password = bcrypt.hash(password)

    loginInfo_collection.insert_one({"email": email, "username": username, "password": hashed_password, "role": role})

    return jsonify({"msg": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    user = loginInfo_collection.find_one({"username": username})
    if not user:
        return jsonify({"msg": "Invalid username"}), 401

    if not bcrypt.verify(password, user["password"]):
        return jsonify({"msg": "Invalid password"}), 401

    access_token = create_access_token(identity=username)

    return jsonify({"access_token": access_token, "role": user["role"]}), 200


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

@app.route("/get_users", methods=["GET"])
def get_users():
    try:
        users = loginInfo_collection.find()

        users_list = []
        for user in users:
            users_list.append({
                "id": str(user["_id"]),  
                "email": user.get("email", "No email provided"),
                "username": user.get("username", "No username provided"),
                "role": user.get("role", "user"),  
            })

       
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving users", "error": str(e)}), 500
    

@app.route("/get-login", methods=["GET"])
def get_login():
    try:
        data = loginInfo_collection.find()

        result = []
        for document in data:
            document["_id"] = str(document["_id"])  
            result.append(document)

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
 # "get all events"
@app.route("/get_events", methods=["GET"])
def get_events():
    try:
        events = events_collection.find()

        events_list = []
        for event in events:
            event_data = {
                "id": str(event["_id"]),  
                "title": event.get("title"),
                "description": event.get("description"),
                "date": event.get("date"),
                "location": event.get("location"),
                "area": event.get("area"),
                "tags": event.get("tags", []),  #
                "image_url": event.get("image_url"),
            }
            events_list.append(event_data)

        return jsonify(events_list), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving events", "error": str(e)}), 500


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/events", methods=["POST"])
def create_event():
    try:
        data = request.form.to_dict()
        image_file = request.files.get("image") 

        required_fields = [
            "title", "description", "date", "startTime", "endTime", "location", "tags", "area"
        ]


        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                "msg": "Missing some required fields",
                "missing_fields": missing_fields  
            }), 400

        image_path = None
        if image_file:
            filename = image_file.filename
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            image_file.save(image_path) 

        event = {
            "title": data["title"],
            "description": data["description"],
            "date": data["date"],
            "startTime": data["startTime"],
            "endTime": data["endTime"],
            "location": data["location"],
            "tags": data["tags"].split(","), 
            "area": data["area"],
        }

        if image_path:
            event["image"] = image_path

        result = events_collection.insert_one(event)

        event["_id"] = str(result.inserted_id)

        return jsonify({"msg": "Event created successfully", "event": event}), 201

    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"msg": "Internal Server Error"}), 500


if __name__ == "__main__":
    app.run(debug=True)   


