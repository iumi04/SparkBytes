from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
import certifi
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS
import re
import os
from bson import ObjectId
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


app = Flask(__name__)

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USERNAME = "pranitd23@gmail.com"  
EMAIL_PASSWORD = "zkrq woxt ioka lwfc" 

CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

MONGO_URI = "mongodb+srv://pranitd23:2YXiehbHn1BAhYLX@cluster0.ixopq.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
loginInfo_db = client["logininfo"] 
loginInfo_collection = loginInfo_db["sparkbytes"]
events_db = client["events"]
events_collection = events_db["sparkbytes"]

app.config["JWT_SECRET_KEY"] = "nobucketsumi" 
jwt = JWTManager(app)

# This is the route for the home page, this returns a simple message indicating that the server is up and running
@app.route("/")
def home():
    return "Server Running"

# This is the route for user signup, it handles both OPTIONS (preflight) and POST requests
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

# This is the route that handles user login, handles POST requests to authenticate users
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

    access_token = create_access_token(identity=str(user["_id"]))


    return jsonify({"access_token": access_token, "role": user["role"]}), 200


# This is the route for a protected resource, and it requires a valid JWT token to access
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

# This is the route to get a list of all users from the database (for our testing purposes)
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
    

# This is the route to get login information for all users (mainly for testing purposes)
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
    
# This is the route to get a list of all events from the database
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
                "startTime": event.get("startTime"),
                "endTime": event.get("endTime"),
                "tags": event.get("tags", []),  
                "image_url": event.get("image_url"),
                "created_by": event.get("created_by"),
                "signed_up_by": event.get("signed_up_by")
            }
            events_list.append(event_data)

        return jsonify(events_list), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving events", "error": str(e)}), 500



UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# This is the route to create a new event, which requires a valid JWT token to access
@app.route("/events", methods=["POST"])
@jwt_required()
def create_event():
    try:
        data = request.form.to_dict()
        image_file = request.files.get("image") 
        user_id = get_jwt_identity()

        try:
            print("Authorization Header:", request.headers.get("Authorization"))
            user_id = get_jwt_identity()  

        except Exception as e:
            print("Error occurred:", e)
            return jsonify({"msg": "Internal Server Error"}), 500

        required_fields = [
            "title", "description", "date", "startTime", "endTime", "location", "tags", "area"
        ]

        print(data["startTime"])
        print(data["endTime"])

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
            "created_by": user_id,
            "signed_up_by": []
        }

        if image_path:
            event["image"] = image_path

        result = events_collection.insert_one(event)

        event["_id"] = str(result.inserted_id)

        return jsonify({"msg": "Event created successfully", "event": event}), 201

    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"msg": "Internal Server Error"}), 500


# Route to get the currently logged-in user's ID, also requires a valid JWT token
@app.route("/whoami", methods=["GET"])
@jwt_required()
def who_am_i():
    user_id = get_jwt_identity()
    return jsonify({"logged_in_user_id": user_id}), 200

# Route for users to sign up for an event, also requires a valid JWT token
@app.route("/signup_event", methods=["POST"])
@jwt_required()
def signup_event():
    try:
        data = request.get_json()
        
        user_id = get_jwt_identity()  
        event_id = data.get("event_id")
        print("event_id:", event_id)

        if not event_id:
            return jsonify({"msg": "Event ID is required"}), 400

        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"msg": "Event not found"}), 404

        print("Current signed_up_users:", event.get("signed_up_by", []))  # Log current signed_up_users

        if user_id not in event.get("signed_up_by", []):
            print(f"User {user_id} is signing up for event {event_id}.")  # Log user signing up
            events_collection.update_one(
                {"_id": ObjectId(event_id)},
                {"$addToSet": {"signed_up_by": user_id}}
            )
            print("Updated signed_up_users:", event.get("signed_up_by", []))  # Log updated signed_up_users

        user = loginInfo_collection.find_one({"_id": ObjectId(user_id)})
        if event_id not in user.get("signed_up_events", []):
            print(f"User {user_id} is being added to signed_up_events for event {event_id}.")  # Log user event signup
            loginInfo_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$push": {"signed_up_events": event_id}}
            )

            user = loginInfo_collection.find_one({"_id": ObjectId(user_id)})
        user_email = user.get("email")  

        send_email_notification(user_email, event) 

        return jsonify({"msg": "Successfully signed up for the event"}), 200

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"msg": "Internal Server Error from backend", "error": str(e)}), 500

@app.before_request
def log_request_info():
    print("Authorization header:", request.headers.get("Authorization"))

# Route that allows event organizers to update an event, requires JWT token.
@app.route("/events/<event_id>", methods=["PUT"])
@jwt_required()
def update_event(event_id): 
    try:
        current_user_id = get_jwt_identity()  # Validate JWT
        print("current_user_id:", current_user_id)  # Log the user ID

        data = request.get_json()  # Parse request payload
        if not data:
            return jsonify({"msg": "No data provided"}), 400

        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"msg": "Event not found"}), 404

        # Update event in the database
        updated_event = {key: data[key] for key in data if key in event}
        events_collection.update_one({"_id": ObjectId(event_id)}, {"$set": updated_event})

        # Prepare the updated event response
        updated_event_response = {**event, **updated_event}
        updated_event_response["_id"] = str(updated_event_response["_id"])  # Convert ObjectId to string
        updated_event_response["created_by"] = str(updated_event_response["created_by"])  # Convert ObjectId if applicable

        return jsonify({"msg": "Event updated successfully", "event": updated_event_response}), 200
    
    except Exception as e:
        print("Error:", str(e))  # Log the error
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500
    
# delete event route
@app.route("/events/<event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    try:
        current_user_id = get_jwt_identity()
        event = events_collection.find_one({"_id": ObjectId(event_id)})

        if not event:
            return jsonify({"msg": "Event not found"}), 404

        events_collection.delete_one({"_id": ObjectId(event_id)})

        return jsonify({"msg": "Event deleted successfully"}), 200

    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500

# Function to send email notifications to users when they sign up for an event
def send_email_notification(user_email, event):
    subject = f"Reminder: {event['title']} starts soon!"
    body = f"""
    Hi there,

    You successfully signed up for the event "{event['title']}".

    Event Details:
    - Date: {event['date']}
    - Start Time: {event['startTime']}
    - Location: {event['location']}

    Thank you for signing up!

    Love,
    The SparkBytes Team
    """

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USERNAME
    msg["To"] = user_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USERNAME, user_email, msg.as_string())       

if __name__ == "__main__":
    app.run(debug=True)   


