# ⚡ CodeJudge - Online Judge Platform

A full-stack Online Judge platform where users can solve coding problems, write code in multiple programming languages, submit solutions, and view detailed results.

---

## 🌐 Live Demo

* **Frontend:** [https://online-judge-l6zj.vercel.app/](https://online-judge-l6zj.vercel.app/)
* **Backend API:** [https://online-judge-xvbw.onrender.com/](https://online-judge-xvbw.onrender.com/)
* **GitHub Repository:** [https://github.com/codewithsudheer7088-wq/online-judge](https://github.com/codewithsudheer7088-wq/online-judge)

---

## 🚀 Features

### 👤 Authentication

* User Signup and Login
* JWT-based Authentication
* Protected Routes

### 🧩 Problem Management

* View all coding problems
* Filter by difficulty (Easy / Medium / Hard)
* Open detailed problem statements

### 💻 Code Editor

* Monaco Editor integration
* Multi-language support:

  * C++
  * C
  * Python
  * JavaScript
  * Java

### 📤 Code Submission

* Submit code against test cases
* Detailed result page
* Execution time and memory usage

### 📊 Submission Tracking

* Submission History
* Leaderboard
* User statistics

### ☁️ Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* PostgreSQL database

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Monaco Editor
* Tailwind CSS / CSS
  
---
# Frontend Highlight
  Features
* React + Vite
* Monaco Editor
* Problem List
* Difficulty Filter
* Result Page
* Submission History
* Leaderboard
  
 Good File Organization
* components/
* pages/
* App.jsx
* main.jsx
    
  ---
  
### Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* Bcrypt

### Database

* PostgreSQL

### Deployment

* Vercel
* Render

---

## 📁 Project Structure

```bash
online-judge/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/codewithsudheer7088-wq/online-judge.git
cd online-judge
```

### 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

### 3️⃣ Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Problems

* `GET /api/problems`
* `GET /api/problems/:id`
* `POST /api/problems`

### Submissions

* `POST /api/submission/submit`
* `GET /api/submission/:id`
* `GET /api/submission/history`

### Leaderboard

* `GET /api/submission/leaderboard`

---

## 🧪 Sample Test Problems

### Easy - Add Two Numbers

Input:

```text
2 3
```

Output:

```text
5
```

### Medium - Multiply Two Numbers

Input:

```text
2 3
```

Output:

```text
6
```

### Hard - Factorial

Input:

```text
5
```

Output:

```text
120
```

--

## 📸 Screenshots

## 🏗️ Architecture Overview

1. User logs in using JWT authentication.
2. Frontend fetches problems from backend API.
3. User writes code in Monaco Editor.
4. Code is submitted to backend.
5. Backend evaluates code against test cases.
6. Submission result is stored in PostgreSQL.
7. Result, history, and leaderboard are displayed.

---

## 🎯 Resume Description

Developed a full-stack Online Judge platform that allows users to solve coding problems in multiple languages, submit solutions, and receive detailed execution results. Implemented JWT authentication, Monaco Editor integration, submission history, and leaderboard using React, Node.js, Express, Sequelize, and PostgreSQL.

## 📸 Screenshots

### 🏠 Home Page

![Home Page](https://github.com/user-attachments/assets/5b5f4ab2-3042-4284-a3c6-8ba9bfaaca63)

---

### 💻 Monaco Editor

![Monaco Editor](https://github.com/user-attachments/assets/26dd96b1-f4a9-4af1-abcb-58797a9fb038)

---

### 📤 Submission Result

![Submission Result](https://github.com/user-attachments/assets/1364cf63-d212-47df-883f-018bb5e94d9f)

---

### 🏆 Leaderboard

![Leaderboard](https://github.com/user-attachments/assets/8ab3d0fe-95b7-4c6a-a85a-2ec9d01076c9)

---

### 📜 Submission History

![Submission History](https://github.com/user-attachments/assets/40fe813c-289b-49ad-9f07-d86d0000512b)

---

## 🔮 Future Enhancements

* Real Docker-based secure code execution
* Admin dashboard to add problems
* Coding contests
* AI-based hints
* Dark mode
* Discussion forum

---

## 👨‍💻 Author

**Sudheer Yadav**

* GitHub: [https://github.com/codewithsudheer7088-wq](https://github.com/codewithsudheer7088-wq)
* LinkedIn:  https://www.linkedin.com/in/sudheer-yadav-16a6312bb
  

---

