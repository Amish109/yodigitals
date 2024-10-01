module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true, //Order ID can be null if not linked to an order
      references: {
        model: 'orders', 
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    amount: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['credit', 'debit']],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enables soft delete functionality by using 'deletedAt'
    tableName: 'transactions',
  });

  // Associations (Optional, if necessary)
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Transaction.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  };

  return Transaction;
};
