from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
import certifi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

# MongoDB connection string
MONGO_URI = "mongodb+srv://pranitd23:rg4s4CiRNiF9P8BT@cluster0.ixopq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["sparkbytes"]
collection = db["users"]

# Flask app setup
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Replace with your own secret key
jwt = JWTManager(app)

# Home route
@app.route("/")
def home():
    return "Hello, Flask!"

# Signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # Validate input data
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    email = data["email"]
    password = data["password"]

    # Check if user already exists
    existing_user = collection.find_one({"email": email})
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hash(password)

    # Save user to the database
    collection.insert_one({"email": email, "password": hashed_password})

    return jsonify({"msg": "User created successfully"}), 201

# Login route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    # Find the user by email
    user = collection.find_one({"email": email})
    if not user:
        return jsonify({"msg": "Invalid email or password"}), 401

    # Check if the password is correct
    if not bcrypt.verify(password, user["password"]):
        return jsonify({"msg": "Invalid email or password"}), 401

    # Generate JWT token
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

# Protected route (Example)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

if __name__ == "__main__":
    app.run(debug=True)
