const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res, next) => {
  try {
    const { limit } = req.query;

    // Check the limit parameter
    if (limit && isNaN(limit)) {
      return res
        .status(400)
        .json({ error: 'Parameter "limit" must be a number' });
    }

    // Main logic
    const query = limit
      ? "SELECT * FROM products LIMIT ?"
      : "SELECT * FROM products";

    const params = limit ? [parseInt(limit, 10)] : [];

    db.query(query, params, (err, results) => {
      if (err) {
        // Pass the error to the error handler
        return next(err);
      }

      res.json(results);
    });
  } catch (error) {
    // Pass synchronous errors to the error handler
    next(error);
  }
});

// Get product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(results[0]);
  });
});

// routes/product.js
router.post("/", (req, res) => {
  const { id, name, price } = req.body;
  const query = "INSERT INTO products (id, name, price) VALUES (?, ?, ?);";
  db.query(query, [id, name, price], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product added!", id: results.insertId });
  });
});

// routes/product.js
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";

  db.query(query, [name, price, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product updated!" });
  });
});

// routes/product.js
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product deleted!" });
  });
});

module.exports = router;
