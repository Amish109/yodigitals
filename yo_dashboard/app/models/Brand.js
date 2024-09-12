// models/Brand.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Brand = sequelize.define('Brand', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Define other fields here
}, {
  tableName: 'brands', // Ensure this matches your actual table name
  timestamps: false
});

module.exports = Brand;
