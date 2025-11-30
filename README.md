# 🔐 Task #3 - Password Hashing & Authentication

A Node.js REST API implementing secure password hashing using bcrypt for user authentication.

## 📋 Task Requirements

Implementing password security using hashing.
- User passwords are securely stored in the database using a hashing algorithm.
- The system allows registration, login, and user management.

## 🚀 How to Run

1.  **Database Setup:**
    - Import the SQL file from the `SQL_DB` folder into your MySQL database.
    - Update `dbSingleton.js` with your database credentials if necessary.

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Server:**
    ```bash
    node app.js
    ```

## 🔌 API Endpoints

### 👤 Users (`/users`)
- `GET /` - Get all users
- `POST /` - Register a new user (Body: `name`, `email`, `password`)
- `PUT /:id` - Update user by ID
- `DELETE /:id` - Delete user by ID
- `POST /login` - Login (Body: `email`, `password`)

### 📦 Products (`/products`)
- Standard CRUD operations for products

### 🛒 Orders (`/order`)
- Standard CRUD operations for orders

## 🧪 Test Accounts

You can use these accounts to test the login functionality:

```json
[
  {
    "name": "Bshara Karkaby",
    "email": "bshra.karkaby@gmail.com",
    "password": "opa123"
  },
  {
    "name": "Moner Makhouly",
    "email": "monermahkouly@gmail.com",
    "password": "moner123"
  },
  {
    "name": "testAccount",
    "email": "test@gmail.com",
    "password": "55"
  }
]
```

## 🔒 Security Features

- **Password Hashing**: Uses `bcrypt` to hash passwords before storing them
- **Secure Login**: Compares hashed passwords during authentication
- **No Plain Text**: Passwords are never stored in plain text

## 👥 Students

- Bshara Karkaby [49-2]
- Moner Makholuy [49-2]

---

**Happy coding!** 💻✨
