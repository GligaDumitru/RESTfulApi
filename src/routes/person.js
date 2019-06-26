const express = require("express");
const router = express.Router();

// Get All Persons
router.get("/api/v1/persons", (req, res) => {
  res.end("<h1>as</h1>");
});

// Get One Person
router.get("/api/v1/persons/:id", (req, res) => {
  res.end(`You have sent:${req.params.id}`);
});

router.get("/error", (req, res) => {
  throw new Error("this is a forcederrro");
});

module.exports = router;
