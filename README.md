# Secure File Hosting Application

## 📌 Overview
This project is a full-stack secure file hosting application created for my Computer Science Internet Tools course.

The goal of this project was to build an application where users can register, log in, upload files, view their files, and delete them securely. The project connects a frontend interface with a backend API and a MongoDB database.

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Multer (file uploads)
- Bcrypt (password hashing)

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## 🔐 Features

- User registration and login
- Passwords are securely hashed before storage
- JWT authentication for protected routes
- Upload files (`.pdf` and `.mp4` only)
- View all uploaded files
- View files uploaded by the logged-in user
- Delete files (only by the owner)
- Backend API handles all data securely

---

## ⚙️ How to Run the Project (Step by Step)

### 1. Open Terminal

On Mac/Windows open terminal 
---

### 2. Clone the repository

Run:
git clone https://github.com/Mary-I/Comp-Sci-Internet-Tools-Final-Project.git

Then run:
cd Comp-Sci-Internet-Tools-Final-Project

---

### 3. Go into the backend folder

Run:
cd backend

---

### 4. Install dependencies

Run:
npm install

---

### 5. Create a `.env` file

Inside the backend folder, create a file named .env and add:

PORT=5050  
MONGO_URI=mongodb://127.0.0.1:27017/secure_file_hosting  
JWT_SECRET=your_secret_key  

---

### 6. Start MongoDB

Run:
brew services start mongodb/brew/mongodb-community

---

### 7. Start the backend server

Run:
npm run dev

You should see:
MongoDB connected  
Server running on port 5050  

---

### 8. Open the frontend

Go to the frontend folder and open:
index.html

You can:
- double-click the file  
or  
- use Live Server in VS Code  

---

### 9. Use the application

1. Click **Go to Login**
2. Log in with your account  
3. Upload a file  
4. View your files in the dashboard  
5. Navigate to the Downloads page to see all uploaded files  

---

## 🌐 API Endpoints

### Authentication
- POST /api/register
- POST /api/login

### File Management
- POST /api/upload
- GET /api/public-files
- GET /api/my-files
- DELETE /api/files/:id

---

## 📸 Demo

A demonstration of the application has been uploaded to YouTube:  
https://youtu.be/_49OHvQlGnk

---

## 🎯 Summary

This project helped me understand how to build a full-stack application using a backend API, database, and frontend interface. It also demonstrates authentication, file handling, and secure data management.

---

## 👤 Author
Mary I
