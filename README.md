<h1 align="center">
  Social Network API
</h1>

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge" alt="JavaScript">    
    <img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge" alt="Express.js">
    <img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB">
</p>

<h4 align="center">Backend API for a social network.</h4>

## Table of Contents
1. [Description](#description)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Contact Information](#contact-information)
7. [License](#license)


## Description
This is a backend API for a social network. It uses Express.js for routing, MongoDB for the database, and Mongoose for the ODM. The API allows users to create, read, update, and delete users, thoughts, and reactions. Users can also add and remove friends.

## Requirements
* Node.js
* MongoDB
* A REST API client such as Insomnia or Postman

## Installation
1. Clone the repository
```
git clone https://github.com/cwchilvers/Social-Network-API.git
```
2. Install dependencies
```
npm install
```
3. Create a `.env` file in the root directory and add the following:
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/social-network
```
4. Open MongoDB and create a database called `social-network`
5. Seed the database
```
npm run seed
```
6. Start the server
```
npm start
```

## Usage
The API can be tested using Insomnia or Postman. The following routes are available:

### Users
* GET `/api/users` - Get all users
* GET `/api/users/:userId` - Get a single user by ID
* POST `/api/users` - Create a new user
* PUT `/api/users/:userId` - Update a user by ID
* DELETE `/api/users/:userId` - Delete a user by ID

### Thoughts
* GET `/api/thoughts` - Get all thoughts
* GET `/api/thoughts/:id` - Get a single thought by ID
* POST `/api/thoughts` - Create a new thought
* PUT `/api/thoughts/:id` - Update a thought by ID
* DELETE `/api/thoughts/:id` - Delete a thought by ID

### Reactions
* POST `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
* DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

### Friends
* POST `/api/users/:userId/friends/:friendId` - Add a friend to a user
* DELETE `/api/users/:userId/friends/:friendId` - Remove a friend from a user

## Technologies Used
* JavaScript
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Contact Information
<p align="center">
    <a href="mailto:cwchilvers@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"></a>
    <a href="https://github.com/cwchilvers"><img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" alt="GitHub"></a>
</p>

## License
This project is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/mit/) page for details.
