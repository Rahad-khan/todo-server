const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require("dotenv").config();


// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo is active");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});