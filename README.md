# Recipe Application Management - Backend

This repository contains the backend for the Recipe Application management system built with Node.js.

## Features

- **RESTful API**
- **User Authentication using JWT**
- **CRUD Operations for Recipes**
- **Search Functionality**: Search for recipes by name and ingredients.
- accessible images through server


## Used Packages

- **Express**: A framework for building APIs and web applications in Node.js.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **Mongoose**: An ODM library for MongoDB.
- **Joi**: A schema description language and data validator for JavaScript objects.
- **Swagger**: A tool for documenting APIs.
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **JWT (JsonWebToken)**: A library to sign, verify, and decode JWT for secure user authentication and authorization.
- **BcryptJs**: A library for hashing, ensuring that sensitive user data is stored securely.
- **Cors**: A middleware that lets a server allow or block requests from different domains.
- **Nodemon**: A utility that automatically restarts the server when file changes are detected.
- **Prettier**: A code formatter that enforces a consistent style for your code.


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v22 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)


### Setup

1. Clone the repository:

```bash
git clone https://github.com/X9Yovix/rma-backend.git

cd rma-backend
```

2. Create the `.env` file:

- In Linux 🐧:

```bash
mv .env.dev .env
```

- In Windows 🪟:

```bash
ren .env.dev .env
```

3. Database configuration:

Update the `.env` file with your database credentials. By default, if you are using a local server for MongoDB, the following URL will be used:
<b> mongodb://localhost:27017/rma </b>

> **_Note:_** Don't forget to create a database called `rma` with an initial collection named `recipes`.

4. Install dependencies:

```bash
npm install
```

5. Run the server:

```bash
npm run dev
```

6. Documentation:

Access the API documentation through the following link:
 [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

7. Token Management:

- **Seed User**: Use the `/seed` endpoint to create a test user in the database.
- **Sign In**: Use the `/login` endpoint to authenticate and retrieve tokens.
- After seeding a user and logging in, you will receive an **access token** and a **refresh token**. Use the access token in the "Authorize" section of Swagger to consume the recipes endpoints.
