require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, (req, res) => {
  console.log(`The server is running on port: ${port}`);
});
