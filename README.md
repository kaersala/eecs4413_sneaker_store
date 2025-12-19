
# 👟 SoleMate - Premium Sneaker Store

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-lightgrey)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **EECS 4413 Project - York University**
>
> A full-stack e-commerce platform designed for sneaker enthusiasts. This application features a responsive React frontend, a robust Spring Boot backend, and a MySQL database deployed on the cloud.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://eecs4413-sneaker-store-deploy.vercel.app](https://eecs4413-sneaker-store-deploy.vercel.app)
- **Database (Railway):** MySQL 8.0

---

## ✨ Features

- **User Authentication:** Secure login and registration system.
- **Product Catalog:** Browse sneakers with filtering and detailed views.
- **Shopping Cart:** Add items, adjust quantities, and manage cart state.
- **Checkout Process:** Simulated order placement workflow.
- **Admin Dashboard:** Manage inventory and view orders (Requires Admin Role).
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** CSS Modules / Tailwind (Standard CSS)
- **State Management:** React Context API / Hooks
- **HTTP Client:** Axios / Fetch API

### Backend
- **Framework:** Spring Boot 3
- **Language:** Java 21
- **Database:** MySQL
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Gradle

---

## ⚙️ Local Development Setup

Follow these instructions to run the project on your local machine.

### Prerequisites
- Java JDK 21 or higher
- Node.js (v18+) and npm
- MySQL Server (running on port 3306)

### 1. Clone the Repository
```bash
git clone [https://github.com/dyu55/eecs4413_sneaker_store.git](https://github.com/dyu55/eecs4413_sneaker_store.git)
cd eecs4413_sneaker_store

2. Database Configuration
 * Create a local MySQL database named sneaker_store.
 * The backend will automatically initialize the tables using schema.sql.
 * (Optional) Update database credentials in backend/sneaker_store_backend/src/main/resources/application.properties if your local root password is not empty.
3. Backend Setup (Spring Boot)
Navigate to the backend directory and start the server:
cd backend/sneaker_store_backend

# On macOS/Linux
./gradlew bootRun

# On Windows
gradlew.bat bootRun

The backend will start at http://localhost:8080.
4. Frontend Setup (React)
Open a new terminal, navigate to the frontend directory, and start the development server:
cd frontend

# Install dependencies
npm install

# Start the app
npm run dev

The frontend will start at http://localhost:5173.
📂 Project Structure
eecs4413_sneaker_store/
├── backend/
│   └── sneaker_store_backend/
│       ├── src/main/java/       # Controllers, Services, Repositories
│       └── src/main/resources/  # application.properties, schema.sql
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page views (Home, Cart, Login)
│   │   └── context/             # Global state management
│   └── package.json
└── README.md

🔑 Admin Credentials (For Testing)
Use the following credentials to access the Admin Dashboard functionalities:
 * Username: admin (Please verify against your database)
 * Password: password123 (Please verify against your database)
📝 SQL Scripts Location
The database initialization scripts are located in the backend resources:
backend/sneaker_store_backend/src/main/resources/
 * schema.sql: Creates the necessary tables.
 * data.sql: Seeds the database with initial product data.
👥 Contributors

Dongling Yu 219511039

Yifei Liu 218968735

Hang Chen 218426106

Li Sha Su 213581772

<!-- end list -->


