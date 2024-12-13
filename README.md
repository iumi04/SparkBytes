# Spark! Bytes

Spark! Bytes' mission is to reduce food waste and promote sustainability on our campus. We aim to connect leftover food from events with hungry students in need of free food. Spark! Bytes is a web application built with Next.js for the frontend and Flask for the backend. The application allows two types of users. Event Organizers and Students. Event Organizers are able to create events. While Students and Event Organizers are both able to sign up for events, and view their signed-up events. It also allows for filtering by food type and location on the BU campus. It utilizes MongoDB for data storage and JWT for user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup and login)
- Event creation and management
- User can sign up for events
- View signed-up events
- Email notifications for event sign-ups

## Technologies Used

- **Frontend:** Next.js, React, NextUI
- **Backend:** Flask, Flask-JWT-Extended, Flask-CORS
- **Database:** MongoDB
- **Authentication:** JWT
- **Email Service:** SMTP (Gmail)

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

### Frontend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/spark-bytes.git
   cd spark-bytes/app/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd spark-bytes/app/backend
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**

   - Create a `.env` file and add your MongoDB URI and email credentials.

4. **Run the Flask server:**

   ```bash
   python server.py
   ```

5. **The backend will be running at:**
   ```
   http://127.0.0.1:5000
   ```

## API Endpoints

- **GET /**: Home route, returns a simple message indicating the server is running.
- **POST /signup**: User signup endpoint.
- **POST /login**: User login endpoint.
- **GET /get_events**: Retrieve all events.
- **POST /events**: Create a new event.
- **POST /signup_event**: Sign up for an event.
- **GET /whoami**: Get the currently logged-in user's ID.

## Presentation Link
https://docs.google.com/presentation/d/1dYpNqCnipBOjFqLVy8YWte6JNpwf7hpxiN01B59TsMw/edit#slide=id.p
