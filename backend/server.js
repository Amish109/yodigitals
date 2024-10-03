const app = require("./app");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require('./models');
app.use(express.json());
const multerMiddleware = require("./middleware/multer");


// db.sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synced successfully');
// }).catch((error) => {
//   console.error('Error syncing database:', error);
// });



// for env file import
dotenv.config({ path: "config/config.env" });

app.get("/", (req, res) => {
  res.send("NodeJs Server is running port 5001");
});

app.listen(process.env.PORT, () => {
  console.log(`server is working on port http://localhost:${process.env.PORT}`);
});
