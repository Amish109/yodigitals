const express = require('express');
const cors = require('cors');
const next = require('next');
const { Sequelize } = require('sequelize');
require('dotenv').config();


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Define the Sequelize instance
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Sync models with the database
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process if database connection fails
  }
};

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Next.js request handler
app.all('*', (req, res) => handle(req, res));

// Prepare Next.js and start the server
nextApp.prepare().then(async () => {
  await connectToDatabase(); // Ensure the database is connected before starting the server

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error preparing Next.js application:', err);
});
