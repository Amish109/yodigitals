module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true, 
      },
      brand_id: {
        type: DataTypes.INTEGER,

        unique: true, 
        allowNull: true,  
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "brands",
      timestamps: true,  
    }
  );

  return Brand;
};
