module.exports = (sequelize, DataTypes) => {
  const BusinessInfo = sequelize.define(
    "BusinessInfo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users', // Name of the table in the database
          key: 'id' // Column name in the referenced table
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      business_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      business_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      gst_number: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true
      },
      cin: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      turnover: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createdAt',
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updatedAt',
      },

    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        field: 'deletedAt',
    }
    },
    {
      tableName: "business_info",
      timestamps: true, // Disable automatic timestamps as you're manually setting `created_at` and `updated_at`
    }
  );

  return BusinessInfo;
};
