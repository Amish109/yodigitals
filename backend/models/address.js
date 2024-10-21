module.exports = function (sequelize, DataTypes) {
    const address = sequelize.define('address', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        }
      
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      addressLine2: {
        type: DataTypes.STRING, 
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Home', 'Office', 'Other'), 
        defaultValue: 'Home', 
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
    }, {
      timestamps: true, 
      paranoid: true,   
    });
  
    
    address.associate = function (models) {
    
        address.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      };
  
    return address;
  };
  