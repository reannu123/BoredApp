# BoredApp - Client

## Note: This is only the client component of the app. The API can be accessed in this [repository](https://github.com/reannu123/BoredApp-server).

<br>

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

### 2.1 Start the server

The server that serves the API for this app can be accessed in this [repository](https://github.com/reannu123/BoredApp-server)

### 3. Start the client

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
