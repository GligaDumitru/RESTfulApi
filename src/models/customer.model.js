const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://admin_123:admin_123@ds343217.mlab.com:43217/customer_api`
);

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("customer2", CustomerSchema);
