# READ IT Back-End

Welcome to the back-end repository of the READ IT project, a robust back-end service designed with NestJS, Prisma, and SQLite. This guide will assist you in setting up, running, and contributing to the back-end services that power the READ IT application.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: An open-source next-generation ORM that makes database access easy with an auto-generated query builder for TypeScript & Node.js.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

## Prerequisites

- Node.js (Version v18.13.0 or higher)
- npm (Version 9.6.7 or higher) or Yarn

## Installation

Clone the Git repository to your local machine:

```bash
git clone https://github.com/DelhiaGbelidji/read-it-backend.git
```

Access the project folder:
```bash
cd read-it-backend
```

Install the project dependencies:
```bash
npm install
```

Or with Yarn
```bash
yarn install
```

## Database Setup
To set up the SQLite database with Prisma, follow these steps:

1. Ensure your Prisma schema file (prisma/schema.prisma) is configured to use SQLite.
2. Run the following command to create your SQLite database file and generate the Prisma client:
```bash
npx prisma migrate dev
```
This command also applies any pending migrations.

## Running in devlopment
To start the development server with NestJS:
```bash
npm start
```
Or with Yarn
```bash
yarn start
```

This will start the NestJS server on a default port.

## API Documentation
NestJS projects often use Swagger for API documentation. If you've set up Swagger, you can access your API documentation at http://localhost:3000/api.
