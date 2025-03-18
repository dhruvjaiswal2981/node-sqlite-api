# 📌 Node.js REST API with SQLite - Social Media Backend
- This project is a RESTful API built using Node.js and SQLite. It manages users, posts, and comments, simulating a simple social media backend. The API fetches data from an external API (JSONPlaceholder) and stores it in an SQLite database.

## 📌 Features

1. Fetch users, posts, and comments from JSONPlaceholder and store them in SQLite.
2. CRUD operations for users:
    - Create a new user
    - Fetch user details (with posts and comments)
    - Delete all users
    - Delete a user by ID
3. Error handling and validation included.

## 🚀 Technologies Used
- Node.js – Backend runtime
- Express.js – Web framework
- SQLite3 – Lightweight database
- Axios – HTTP requests
- body-parser – Middleware for handling JSON requests

## 📂 Project Structure

    ``` bash
    node_assignment/
    │-- node_modules/
    │-- database.sqlite      # SQLite database file  
    │-- index.js             # Main server file  
    │-- db.js                # Database connection setup  
    │-- routes.js            # API routes  
    │-- package.json         # Project dependencies  
    │-- README.md            # Project documentation  
    ```

## ⚙️ Installation

1️⃣ Clone the repository

    ```bash
    git clone https://github.com/dhruvjaiswal2981/node-sqlite-api.git
    cd node-sqlite-api
    ```

2️⃣ Install dependencies

    ```bash
    npm install
    ```

3️⃣ Run the server

    ```bash
    node index.js
    ```

- 🚀 The server will start at: http://localhost:3000

## 📡 API Endpoints

1.  🔹 Load Data

- Fetch and store 10 users, their posts, and comments in the database.

    ```sh
    GET /load
    ```
- ✅ Response: 200 OK (Empty response)
- ❌ Error: 500 Internal Server Error if something fails.

2. 🔹 Get All Users

    ```sh
    GET /users
    ```

- ✅ Response: Returns a list of all users.

3. 🔹  Get User by ID

    ```sh
    GET /users/:userId

    ```

- ✅ Response: Returns user details with their posts and comments.
- ❌ Error: 404 Not Found if user doesn’t exist.

4. 🔹 Add a New User

    ```sh
    PUT /users
    ```
- ✅ Request Body:
    ```json
    {
    "id": 11,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
    }
    ```

- ✅ Response: 201 Created
- ❌ Error: 409 Conflict if user ID already exists.

5. 🔹 Delete All Users
    ```sh
    DELETE /users
    ```
- ✅ Response: 204 No Content
- ❌ Error: 500 Internal Server Error if deletion fails.

6. 🔹 Delete a User by ID
    ```bash
    DELETE /users/:userId
    ```
- ✅ Response: 204 No Content
- ❌ Error: 404 Not Found if user doesn’t exist.


## 📌 Database Schema

- 🛠️ Users Table

| Column   | Type | Constraints |
|----------|------|-------------|
| id       | INT  | PRIMARY KEY, UNIQUE |
| name     | TEXT | NOT NULL |
| username | TEXT | NOT NULL |
| email    | TEXT | NOT NULL |

- 🛠️ Posts Table

| Column  | Type | Constraints |
|---------|------|-------------|
| id      | INT  | PRIMARY KEY, UNIQUE |
| user_id | INT  | FOREIGN KEY (users.id) |
| title   | TEXT | NOT NULL |
| body    | TEXT | NOT NULL |

- 🛠️ Comments Table

| Column  | Type | Constraints |
|---------|------|-------------|
| id      | INT  | PRIMARY KEY, UNIQUE |
| post_id | INT  | FOREIGN KEY (posts.id) |
| name    | TEXT | NOT NULL |
| email   | TEXT | NOT NULL |
| body    | TEXT | NOT NULL |

## 📌 Error Handling

| HTTP Status | Meaning |
|------------|---------|
| 200 OK | Request successful |
| 201 Created | New resource created |
| 204 No Content | Successful deletion (no response body) |
| 400 Bad Request | Invalid request data |
| 404 Not Found | Resource not found |
| 409 Conflict | Duplicate entry |
| 500 Internal Server Error | Unexpected error |



## Google Drive Upload 

- Access it here:

## 🚀 Deployment

- Live Demo: The application is hosted on Render
- Access it here: https://node-sqlite-api-5xwm.onrender.com

## 👨‍💻 Author
- 💡 Developed by Dhruv Jaiswal
- 📧 Contact: dhruvujjain@gmail.com