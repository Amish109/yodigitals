module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define(
      "Brand",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
          allowNull: true,
        },

     
      },
      {
        tableName: "brands",
        timestamps: true,
      }
    );
  
    return Brand;
  };
  