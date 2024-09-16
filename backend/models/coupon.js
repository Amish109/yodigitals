module.exports = function(sequelize, DataTypes) {
    const coupon = sequelize.define('coupon', {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expired: {
        type: DataTypes.DATE,
        allowNull: false,
      }
  }, 
  {
    timestamps: true,
    paranoid: true, 
  });
  
    return coupon;
  };
  