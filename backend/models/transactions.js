module.exports = function(sequelize, DataTypes) {
    const Transaction = sequelize.define('transactions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
      },
      amount: {
        type: DataTypes.NUMERIC, // Changed to NUMERIC for precision
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.STRING(10), // Match with character varying(10)
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    }, {
      timestamps: true,
      paranoid: true, // For soft deletes
    });
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.users, { foreignKey: 'user_id' });
      Transaction.belongsTo(models.orders, { foreignKey: 'order_id', onDelete: 'SET NULL' });
    };
  
    return Transaction;
  };
  