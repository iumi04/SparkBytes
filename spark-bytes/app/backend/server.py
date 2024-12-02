from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
import certifi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
import re

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

MONGO_URI = "mongodb+srv://pranitd23:rg4s4CiRNiF9P8BT@cluster0.ixopq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["logininfo"] 
collection = db["sparkbytes"]

app.config["JWT_SECRET_KEY"] = "nobucketsumi" 
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Hello, Flask!"

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

    existing_user = collection.find_one({"username": username})
    if existing_user:
        return jsonify({"msg": "Username already exists"}), 400
    
    existing_email = collection.find_one({"email": email})
    if existing_email:
        return jsonify({"msg:" "Email is being used by another account"}), 400

    hashed_password = bcrypt.hash(password)

    collection.insert_one({"email": email, "username": username, "password": hashed_password, "role": role})

    return jsonify({"msg": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    user = collection.find_one({"username": username})
    if not user:
        return jsonify({"msg": "Invalid username"}), 401

    if not bcrypt.verify(password, user["password"]):
        return jsonify({"msg": "Invalid password"}), 401

    access_token = create_access_token(identity=username)

    return jsonify({"access_token": access_token}), 200


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

@app.route("/get_users", methods=["GET"])
def get_users():
    try:
        users = collection.find()

        users_list = []
        for user in users:
            users_list.append({
                "id": str(user["_id"]),  
                "email": user["email"],
                "role": user.get("role", "user"),  
            })

       
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving users", "error": str(e)}), 500
    

@app.route("/get-login", methods=["GET"])
def get_login():
    try:
        data = collection.find()

        result = []
        for document in data:
            document["_id"] = str(document["_id"])  
            result.append(document)

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    


if __name__ == "__main__":
    app.run(debug=True)   


