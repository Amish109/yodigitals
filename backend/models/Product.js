module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false, 
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }, 
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
      description: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true, // Set to false if this field is mandatory
      },
      unitValue: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY if you want to store multiple colors
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('in stock', 'out of stock'),
        allowNull: false,
      },

      identityNumber: {
          type: DataTypes.STRING,
          allowNull: true, // HSN, IMEI, etc.
        },
        brandId: {
          type: DataTypes.UUID,
          references: {
            model: 'brands',  // Ensure this matches the actual table name
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      

        categoryId: {
          type: DataTypes.UUID,
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },


      createdById: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedById: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      distributor_price: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
      },

      images: {  
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    
    },
    {
      tableName: 'products',
      timestamps: true,
    }
  );

  Products.associate = function (models) {
      Products.belongsTo(models.Brand, {
          foreignKey: 'brandId',
          as: 'brand',
        });

    Products.belongsTo(models.User, {
      foreignKey: 'createdById',
      as: 'createdBy',
    });
    Products.belongsTo(models.User, {
      foreignKey: 'updatedById',
      as: 'updatedBy',
    });

    Products.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    
  };

  return Products;
};
