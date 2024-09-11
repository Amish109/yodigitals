const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// console.log('DB_USER:', process.env.DB_USER);


app.get('/', (req, res) => {
  res.send('Hello, API is running!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
