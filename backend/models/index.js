const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize("test", "postgres", "postgres", {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  port: 5432,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}


testConnection(); 

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Brand = require("./Brand")(sequelize, DataTypes);

db.sequelize.sync({ force: false, logging: false });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
