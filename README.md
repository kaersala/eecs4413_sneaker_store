# 👟 SoleMate - Premium Sneaker Store

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-lightgrey)

> **EECS 4413 Project - York University**
>
> A full-stack e-commerce platform designed for sneaker enthusiasts.

---

## ✨ Key Features

* **🛒 Comprehensive Product Catalog**: Browse a wide variety of sneakers with detailed descriptions, prices, and high-quality images.
* **🔐 Secure User Authentication**: Full sign-up and login functionality to manage user sessions securely.
* **🛍️ Dynamic Shopping Cart**: Real-time cart management allowing users to add items, update quantities, and remove products seamlessly.
* **💳 Simulated Checkout Process**: A smooth checkout flow that simulates order placement and confirmation.
* **👮 Powerful Admin Dashboard**: Dedicated admin panel for managing inventory, adding new products, and updating stock levels.
* **🔍 Advanced Search & Filtering**: Easily find sneakers by searching for names or filtering by categories.
* **📱 Fully Responsive Design**: A modern, mobile-friendly interface built with React and Tailwind CSS that works on all devices.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://eecs4413-sneaker-store-deploy.vercel.app
- **Backend API (Render):** https://eecs4413-sneaker-store-backend.onrender.com
- **Database (Railway):** MySQL 8.0

---

## ⚙️ Local Development Setup

### Prerequisites
- Java JDK 21
- Node.js (v18+)
- MySQL Server (port 3306)

### 1. Clone the Repository

```bash
git clone [https://github.com/dyu55/eecs4413_sneaker_store.git](https://github.com/dyu55/eecs4413_sneaker_store.git)
cd eecs4413_sneaker_store
```

### 2. Database Configuration
1. Create a local MySQL database named `sneaker_store`.
2. The backend will automatically initialize tables using `schema.sql`.

### 3. Backend Setup (Spring Boot)

```bash
cd backend/sneaker_store_backend

# On macOS/Linux
./gradlew bootRun

# On Windows
gradlew.bat bootRun
```
*Server starts at http://localhost:8080*

### 4. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```
*Frontend starts at http://localhost:5173*

---

## 📝 SQL Scripts Location

Required for database initialization:
`backend/sneaker_store_backend/src/main/resources/`

- **schema.sql**
- **data.sql**

---

## 🔑 Admin Credentials

- **Username:** demo@sneakerstore.test
- **Password:** password

## 👥 Contributors

Dongling Yu 219511039

Yifei Liu 218968735

Hang Chen 218426106

Li Sha Su 213581772

<!-- end list -->


