const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "devopsdb1.capoyyqg6fkl.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Varun6990",
    database: "devopsdb1"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed", err);
    } else {
        console.log("Connected to RDS");
    }
});

app.get("/", (req, res) => {
    res.send("DevOps Backend Running 🚀");
});

app.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.post("/messages", (req, res) => {
    const { text } = req.body;
    db.query("INSERT INTO messages (text) VALUES (?)", [text], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Message added!" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
