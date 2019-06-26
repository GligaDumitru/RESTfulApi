const CustomerModel = require("../models/customer.model");
const express = require("express");
const router = express.Router();

// Create a new Customer
router.post("/api/v2/customers", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const model = new CustomerModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get Customer by email
router.get("/api/v2/customers", (req, res) => {
  if (!req.query.email) {
    CustomerModel.find({})
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
    // return res.status(400).json({ msg: "No email added as query" });
  } else {
    const { email } = req.query;
    CustomerModel.findOne({ email })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

// Update an customer by email
router.put("/api/v2/customers", (req, res) => {
  if (!req.query.email) {
    return res.status(400).json({ msg: "no emial added as query" });
  }

  const { email } = req.query;

  CustomerModel.findOneAndUpdate({ email }, req.body, { new: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(doc);
    });
});

// Delete By email
router.delete("/api/v2/customers", (req, res) => {
  if (!req.query.email) {
    return res.status(400).json({ msg: "no emial added as query" });
  }

  const { email } = req.query;

  CustomerModel.findOneAndDelete({ email })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(doc);
    });
});

module.exports = router;
