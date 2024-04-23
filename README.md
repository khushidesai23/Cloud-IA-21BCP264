# Dockerized Three-Tier Application

Welcome to our Dockerized three-tier application setup guide! In this repository, you'll find everything you need to deploy a fully containerized application consisting of a frontend, backend, and database tier using Docker and Docker Compose.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Application Structure](#application-structure)
- [Docker Configuration](#docker-configuration)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [Docker Compose](#docker-compose)
- [Contributing](#contributing)

## Getting Started

Follow these steps to set up the three-tier application on your local machine:

### Prerequisites

- Docker installed on your system ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed on your system ([Get Docker Compose](https://docs.docker.com/compose/install/))

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone <repository-url>

2. Navigate to the root directory of the cloned repository:

    ```bash
    cd <repository-name>
    ```
3. Build and start the Docker containers using Docker Compose:

  ```bash
    docker-compose build
    docker-compose up
  ```
4. Access the application in your web browser:
   
    Frontend: http://localhost:3000
    Backend: http://localhost:4000

## Application Structure

Our three-tier application is structured as follows:

**Frontend:** React.js application encapsulated within a Docker container.

**Backend:** Node.js application serving as the backend logic, also encapsulated within a Docker container.

**Database:** PostgreSQL database running in its own Docker container.


## Docker Configuration

#### Frontend
The frontend Dockerfile is located in the frontend directory. It builds the frontend image and exposes port 3000.

dockerfile
```bash
    FROM node:alpine
    
    WORKDIR /app
    
    COPY package.json .
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD ["npm", "start"]
```
FROM node:alpine: Specifies the base image as Node.js with Alpine Linux.

WORKDIR /app: Sets the working directory inside the container.

COPY package.json .: Copies package.json to the working directory.

RUN npm install: Installs dependencies.

COPY . .: Copies the rest of the application code to the container.

EXPOSE 3000: Exposes port 3000 for the application.

CMD [“npm”, “start”]: Specifies the command to run when the container starts.

### Backend
The backend Dockerfile is located in the backend directory. It builds the backend image and exposes port 4000. The backend service depends on the database service.

dockerfile
```bash
FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
```
FROM node:alpine: Uses Node.js with Alpine Linux as the base image.

WORKDIR /app: Sets the working directory inside the container to /app.

COPY package.json .: Copies package.json to the working directory.

RUN npm install: Installs dependencies.

COPY . .: Copies application code to the container.

EXPOSE 4000: Exposes port 4000.

CMD [“node”, “server.js”]: Specifies the command to start the application.

### Database
The PostgreSQL Dockerfile is located in the root directory. It configures the PostgreSQL database and sets up the necessary environment variables.

dockerfile
```bash
FROM postgres:alpine

ENV POSTGRES_DB todo_db
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD password
```
FROM postgres:alpine: Specifies the base image as PostgreSQL with Alpine Linux. Alpine Linux is a lightweight Linux distribution, making the resulting Docker image smaller.

ENV POSTGRES_DB todo_db: Sets an environment variable POSTGRES_DB to todo_db, which defines the name of the database to be created within PostgreSQL.

ENV POSTGRES_USER admin: Sets an environment variable POSTGRES_USER to admin, which specifies the username for accessing the PostgreSQL database.

ENV POSTGRES_PASSWORD password: Sets an environment variable POSTGRES_PASSWORD to password, which defines the password for the specified username to access the PostgreSQL database.

## Docker Compose
The docker-compose.yml file orchestrates the setup of multiple Docker containers for the three-tier application.

yaml
```bash
version: '3'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    depends_on:
      - db
  db:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      POSTGRES_DB: todo_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
```
## Contributing
Contributions are welcome! If you have suggestions, improvements, or new features to propose, feel free to open an issue or submit a pull request.



   
