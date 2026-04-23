const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serves your HTML

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // 🔴 put your MySQL password here
    database: "ecomDB"
});

db.connect(err => {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// TEST route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// GET products
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// ADD product
app.post("/api/products", (req, res) => {
    const { name, price, image, category } = req.body;

    const sql = "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, price, image, category], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: "Product added successfully" });
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});