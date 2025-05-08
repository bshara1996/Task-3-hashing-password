const dbSingleton = require("../dbSingleton");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const hashPassword = require("../hashPassword");

// Get database connection
const db = dbSingleton.getConnection();

// Get all users
router.get("/", (req, res) => {
  const strQuery = "SELECT * FROM users";
  db.query(strQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Add a new user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  hashPassword(password, (err, hashedPassword) => {
    if (err) {
      res.status(500).send("Error hashing password");
      return;
    }

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "User added!", id: results.insertId });
    });
  });
});

// Update a user by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (password) {
    hashPassword(password, (err, hashedPassword) => {
      if (err) {
        res.status(500).send("Error hashing password");
        return;
      }

      const query =
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
      db.query(query, [name, email, hashedPassword, id], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ message: "User updated!" });
      });
    });
  } else {
    const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(query, [name, email, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "User updated!" });
    });
  }
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User deleted!" });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send("Error checking user - Database error");
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const user = results[0];

    // Compare password with hash
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send("Error comparing passwords");
        return;
      }

      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  });
});

module.exports = router;
