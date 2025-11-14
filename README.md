Todo List App with Authentication

A full-stack Todo List application built with React, Node.js, Express, MongoDB, and Tailwind CSS. Users can signup, login, add todos, mark them as completed, delete todos, and search todos. Authentication is handled using JWT (JSON Web Tokens).

Features
```
User authentication with signup and login.

Secure password hashing using bcryptjs.

JWT-based authentication for protected routes.

Add, update, and delete todos.

Mark todos as completed using a checkbox.

Search todos by title or description.

Responsive and stylish UI using Tailwind CSS.
```
Tech Stack
```
Frontend:

React

React Router DOM

Axios

Tailwind CSS

Backend:

Node.js

Express

MongoDB & Mongoose

JSON Web Token (JWT)

Bcryptjs
```
Installation
```

git clone https://github.com/tulsishuka/Task-Management.git


Backend Setup

cd backend

Install dependencies:

npm install express mongoose cors dotenv jsonwebtoken bcryptjs

Create a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Start the backend server:

nodemon server.js

Frontend Setup

Navigate to frontend folder:
cd frontend

Install dependencies:

npm install react react-dom react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Configure Tailwind by updating tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};


Start the frontend server:

npm run dev
```
Project Structure
```
backend/
│── controllers/
│   ├── authController.js
│   └── todoController.js
│── middleware/
│   └── auth.js
│── models/
│   ├── userModel.js
│   └── todoModel.js
│── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js
│── server.js
│── package.json
│── .env

frontend/
│── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
│── index.html
│── package.json
│── tailwind.config.js
```
Usage
```
Open frontend in browser (usually http://localhost:5173).
```


Notes
```
Ensure backend server runs before using the frontend.

Store JWT token in localStorage for protected routes.

Tailwind CSS is used for styling the UI. Ensure Tailwind is configured properly in your project.
```
