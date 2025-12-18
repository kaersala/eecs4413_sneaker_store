EECS4413 Sneaker Store

This repository contains the Sneaker Store group project for EECS 4413.

The project is organized as a monorepo with separate frontend and backend directories.
Project 4 (P4) focuses on DevOps and deployment of the backend service.

Backend (Spring Boot)

Live Deployment (Render)

The backend service is deployed on Render using Docker.

Base URL:
https://eecs4413-sneaker-store-backend.onrender.com

Health Check Endpoint:
GET /api/health
https://eecs4413-sneaker-store-backend.onrender.com/api/health

The health check endpoint returns the response "OK", confirming that the backend service is running successfully.

Root Endpoint:
GET /
Displays a simple message indicating that the backend service is running.

Local Backend Setup

To run the backend locally, navigate to the backend directory and execute the following commands:

cd backend/sneaker_store_backend
./gradlew clean build
./gradlew bootRun

The backend will run on:
http://localhost:8080

Deployment Details (Project 4)

The backend application is containerized using Docker.
A Dockerfile and docker ignore file are provided in the backend directory.
The server port is configured using an environment variable with a default fallback:
server.port=${PORT:8080}

Render is connected to the GitHub repository for automatic deployment.
Any commit pushed to the p4_devops branch triggers a new deployment on Render.

Project Structure (Relevant to P4)

backend
sneaker_store_backend
Dockerfile
.dockerignore
build.gradle
src/main/java
src/main/resources

frontend
docs

Notes

This deployment satisfies the requirements of EECS 4413 Project 4.
Authentication and database integration are not required for P4.
The backend deployment is verified through a publicly accessible health check endpoint.
