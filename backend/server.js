const app = require("./app");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

app.use(express.json());




// for env file import
dotenv.config({ path: "config/config.env" });

app.get("/", (req, res) => {
  res.send("NodeJs Server is running port 5000");
});

app.listen(process.env.PORT, () => {
  console.log(`server is working on port http://localhost:${process.env.PORT}`);
});
