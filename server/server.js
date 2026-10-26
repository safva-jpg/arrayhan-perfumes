const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Home route
app.get("/", (req, res) => {
  res.send("Arrayhan Perfumes Backend is Running!");
});

// Test API route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Arrayhan Perfumes API is working!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});