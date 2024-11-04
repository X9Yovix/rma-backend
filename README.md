# Recipe Application Management - Backend

This repository contains the backend for the Recipe Application management system built with Node.js.

## Features



## Used Packages

- **Express**: A framework for building APIs and web applications in Node.js.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **Mongoose**: An ODM library for MongoDB.
- **Joi**: A schema description language and data validator for JavaScript objects.
- **Swagger**: A tool for documenting APIs.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/X9Yovix/rma-backend.git

cd rma-backend
```

2. Create the `.env` file:

```bash
mv .env.dev .env
```

3. Database configuration:

Update the `.env` file with your database credentials. By default, if you are using a local server for MongoDB, the following URL will be used:
<b> mongodb://localhost:27017/rma </b>

<hr/>
Don't forget to create a database called `rma` with an initial collection named `recipes`.
<hr/>
4. Install dependencies:

```bash
npm install
```

5. Run the server:

```bash
npm run dev
```
