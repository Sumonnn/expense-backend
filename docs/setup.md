# Backend Setup and Flow

## Environment Configuration
The `.env` file is used to configure the application. Below are the required variables:
- `PORT`: The port on which the server will run (default: 3000).
- `MONGODB_URL`: The MongoDB connection string.
- `JWT_SECRET`: The secret key used for signing JWT tokens.

Example `.env` file:
```properties
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/expense-tracker
JWT_SECRET=your-secret-key
```

## Application Flow
1. **User Authentication**:
   - Users can register and log in using the `/api/v1/auth` endpoints.
   - Passwords are hashed using bcrypt before being stored in the database.
   - JWT tokens are generated upon successful login and used for authentication.

2. **Transaction Management**:
   - Users can add, update, delete, and retrieve transactions.
   - Each transaction is linked to a user via the `userId` field.
   - Transactions are categorized as either `income` or `expense`.

3. **Middleware**:
   - The `auth.middleware.js` file validates JWT tokens to ensure only authenticated users can access protected routes.

4. **Database**:
   - MongoDB is used as the database.
   - The `Transaction` model stores transaction details:
     - `userId`: Reference to the user who owns the transaction.
     - `type`: Either `income` or `expense`.
     - `amount`: The transaction amount.
     - `description`: A brief description of the transaction.
     - `date`: The date of the transaction (default: current date).
   - The `User` model stores user details:
     - `fullName`: Object containing `firstName` and `lastName`.
     - `email`: User's email address.
     - `password`: Hashed password.

## Database Structure
### User Model
| Field       | Type     | Description                          |
|-------------|----------|--------------------------------------|
| `fullName`  | Object   | Contains `firstName` and `lastName`. |
| `email`     | String   | Unique email address.               |
| `password`  | String   | Hashed password.                    |

### Transaction Model
| Field       | Type     | Description                          |
|-------------|----------|--------------------------------------|
| `userId`    | ObjectId | Reference to the user.              |
| `type`      | String   | Either `income` or `expense`.       |
| `amount`    | Number   | Transaction amount.                 |
| `description` | String | Brief description of the transaction. |
| `date`      | Date     | Date of the transaction.            |

## Running the Application
1. Start MongoDB locally or use a cloud MongoDB service.
2. Run the backend server using:
   ```bash
   npm run dev
   ```
3. Use tools like Postman or cURL to test the API endpoints.

## Notes
- Ensure MongoDB is running before starting the server.
- Use a strong `JWT_SECRET` for production environments.
