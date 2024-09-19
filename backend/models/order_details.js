module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define(
      'OrderDetails',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        order_id: {
          type: DataTypes.UUID,
          references: {
            model: 'orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        product_id: {
          type: DataTypes.UUID,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'order_details',
        timestamps: true,
      }
    );
  
    OrderDetails.associate = function (models) {
        OrderDetails.belongsTo(models.Orders, {
            foreignKey: 'order_id',
            as: 'order',
          });


      OrderDetails.belongsTo(models.Products, {
  foreignKey: 'product_id',
  as: 'product',
});
    };
  
    return OrderDetails;
  };
  