# Expense Tracker Backend

This is the backend for the Expense Tracker application. It is built using Node.js, Express, and MongoDB. The backend provides APIs for user authentication, transaction management, and summary generation.

## Features
- User Registration and Login
- JWT-based Authentication
- CRUD Operations for Transactions
- Transaction Summary (Income, Expenses, and Balance)

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   Create a `.env` file in the root directory and add the following:
   ```properties
   PORT=3000
   MONGODB_URL=mongodb://127.0.0.1:27017/expense-tracker
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. The server will run on `http://localhost:3000` (or the port specified in the `.env` file).

## API Endpoints
- **User Authentication**
  - `POST /api/v1/auth/register` - Register a new user
  - `POST /api/v1/auth/login` - Login a user

- **Transaction Management**
  - `POST /api/v1/transaction/addTransaction` - Add a new transaction
  - `GET /api/v1/transaction/getTransactions` - Get all transactions
  - `GET /api/v1/transaction/getTransaction/:id` - Get a transaction by ID
  - `PUT /api/v1/transaction/updateTransaction/:id` - Update a transaction
  - `DELETE /api/v1/transaction/deleteTransaction/:id` - Delete a transaction
  - `GET /api/v1/transaction/getsummary` - Get transaction summary
  - `GET /api/v1/transaction/getTransactionByType/:type` - Get transactions by type (income/expense)

## Documentation
For detailed setup and flow explanation, refer to the [docs/setup.md](docs/setup.md) file.
