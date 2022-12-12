# BoredApp

## Simple CRUD To-do list App using the MERN Stack

This is a simple CRUD To-do list app that utilizes the MERN stack. It is a simple app that allows users to create, read, update, and delete tasks. It also utilizes the BoredAPI to generate task suggestions.

## Features

- User Login and Registration
- Uses Authentication via JWT
- Create, Read, Update, Delete tasks
- Utilizes BoredAPI to generate task suggestions

## Technologies

- React
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- BoredAPI

## Installation

### 1. Clone the repository

`git clone

### 2. Install dependencies

`npm install`

### 3. Create an .env file in the `server` directory

Proceed to the server env variables section to see what variables are needed.

### 3. Start the server

Navigate to the `server` directory and execute the following command: <br>
`npm run dev`

### 4. Start the authentication server

Still in the `server` directory execute the following command: <br>
`npm run devauth`

### 5. Start the client

Navigate to the `client` directory and execute the following command: <br>
`npm start`

## Server env Variables

### 1. ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET

Execute this line in node
`require('crypto').randomBytes(64).toString('hex')` for each of the variables.

### 2. PORT

The port can be whichever port is available on your machine and is not used by the front end and auth server.

### 3. PORT_AUTH

The port can be whichever port is available on your machine and is not used by the front end and server.

### 4. DB_URL

The DB_URL is the URL to your MongoDB database. You can easily create one for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
