# NetworksProject

# Web App for IITGN Sentry

## Overview

The "Web App for IITGN Sentry" is a MERN (MongoDB, Express, React, Node.js) stack-based web application designed to streamline the visitor management process for the Sentry Department at the Indian Institute of Technology Gandhinagar (IITGN).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Install server dependencies:

    ```bash
    cd backend
    npm install
    ```

4. Install client dependencies:

    ```bash
    cd frontend
    npm install
    ```

## Configuration

1. Create a `.env` file in the `server` directory:

    ```env
    PORT=3001
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    TOKEN_KEY= Yuour_Token_key
    ```

    Update the `MONGODB_URI` with your MongoDB connection string.

## Running the Application

1. Start the MongoDB server:

    ```bash
    mongod
    ```
2. Open a new terminal and run the `mongosh` command:

    ```bash
    mongosh
    ```

    In `mongosh`, create a new database:

    ```bash
    use your-database-name
    ```
3. In a new terminal, navigate to the `backend` directory and start the server:

    ```bash
    cd backend
    npm start
    ```

4. In another terminal, navigate to the `frontend` directory and start the React app:

    ```bash
    cd frontend
    npm start
    ```
The backend will run on the PORT= 3001 
The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- Open your web browser and go to [http://localhost:3000](http://localhost:3000).
- Explore the features of the "Web App for IITGN Sentry."


