

module.exports = function (sequelize, DataTypes) {
    const Invoice = sequelize.define(
      "Invoice",
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          filename: {
            type: DataTypes.STRING,
            allowNull: false
          },
          filepath: {
            type: DataTypes.STRING,
            allowNull: false
          }
      },
      {
        timestamps: true,
        paranoid: true,
        tableName: "invoices",
      }
    );
  
   
  
    return Invoice;
  };
  