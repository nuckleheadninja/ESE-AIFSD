# AI-Based Employee Performance Analytics & Recommendation System
## Project Report

### 1. Project Title
**AI-Based Employee Performance Analytics & Recommendation System**

### 2. Problem Statement
The objective of this project is to design and develop a full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using an external AI API (OpenRouter/OpenAI compatible API). The system allows HR/Admin users to add and manage employee details, track employee skills and performance metrics, generate AI-based recommendations for promotions/training, view employee analytics and rankings, and secure the application using JWT authentication.

### 3. Technology Stack
*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Router, React Hot Toast, Lucide React
*   **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JSON Web Tokens (JWT), bcrypt
*   **AI Integration:** OpenRouter API (Gemini-2.5-Pro / OpenAI compatible)
*   **Deployment:** Render (Frontend & Backend)

### 4. Folder Structure
```text
employee-performance-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AIRecommendationModal.jsx
    │   │   ├── EmployeeCard.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── AddEmployee.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

### 5. Screenshots & Documentation

> **Note to Student:** Please replace the bracketed text below with actual screenshots before converting this document to a PDF.

#### 5.1 Frontend Screenshots
*   **Login & Signup Pages:** 
    *   [Insert screenshot of Login Page]
    *   [Insert screenshot of Signup Page]
*   **Dashboard & Analytics:** 
    *   [Insert screenshot of the Dashboard with Analytics Cards]
*   **Employee Registration Form:** 
    *   [Insert screenshot of Add Employee Form]
*   **Employee List & Search:** 
    *   [Insert screenshot of the Employee List with Search & Filters active]

#### 5.2 Backend Code Screenshots
*   [Insert screenshot of `server.js`]
*   [Insert screenshot of `authController.js`]
*   [Insert screenshot of `employeeController.js`]
*   [Insert screenshot of `aiController.js`]

#### 5.3 MongoDB Collection Screenshots
*   [Insert screenshot of MongoDB Atlas showing the Users collection with hashed passwords]
*   [Insert screenshot of MongoDB Atlas showing the Employees collection with data]

#### 5.4 API Testing Screenshots (Postman / Thunder Client)
*   **POST /api/auth/signup:** [Insert Request & Response Screenshot]
*   **POST /api/auth/login:** [Insert Request & Response Screenshot (showing JWT)]
*   **POST /api/employees:** [Insert Request & Response Screenshot]
*   **GET /api/employees:** [Insert Request & Response Screenshot]
*   **GET /api/employees/search?department=Development:** [Insert Request & Response Screenshot]
*   **PUT /api/employees/:id:** [Insert Request & Response Screenshot]
*   **DELETE /api/employees/:id:** [Insert Request & Response Screenshot]
*   **POST /api/ai/recommend:** [Insert Request & Response Screenshot]

#### 5.5 AI Recommendation Output Screenshots
*   [Insert screenshot of the Frontend AI Recommendation Modal showing promotion/training suggestions]

#### 5.6 Authentication Screenshots
*   [Insert screenshot of unauthorized access error (401)]
*   [Insert screenshot of successful login generating token]

#### 5.7 GitHub Repository Screenshots
*   [Insert screenshot of the GitHub repository showing clean commit history and files]

#### 5.8 Render Deployment Screenshots
*   [Insert screenshot of successful Render Backend deployment logs/dashboard]
*   [Insert screenshot of successful Render Frontend deployment logs/dashboard]

### 6. Live Deployment URLs
*   **Live Frontend URL:** [Insert your Render Frontend URL here]
*   **Backend API URL:** [Insert your Render Backend URL here]
*   **GitHub Repository Link:** [Insert your GitHub Repo URL here]

### 7. Project Conclusion
The "AI-Based Employee Performance Analytics & Recommendation System" was successfully developed and deployed. The application provides a seamless interface for HR and Admins to register employees, manage performance scores, and utilize Artificial Intelligence to generate meaningful promotion and training recommendations. The project effectively utilizes the MERN stack for robust data management, JWT for secure authentication, and a modern glassmorphism UI for an enhanced user experience. The integration of the AI API adds significant value by automating performance reviews and feedback generation.
