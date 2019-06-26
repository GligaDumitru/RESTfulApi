const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const personRouter = require("./routes/person");
const customerRouter = require("./routes/customer");
const path = require("path");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(__dirname);
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});
// app.use(personRouter);
app.use(customerRouter);

app.use(express.static("public"));

// Handler not found
app.use((req, res, next) => {
  res.status(404).json({ msg: "not found" });
  next();
});

// Handler for 500 -server error

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});
app.listen(PORT, _ => console.log(`Server is running on port ${PORT}`));
