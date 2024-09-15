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
        discount: {
          type: DataTypes.DECIMAL,
        },
        description: {
          type: DataTypes.TEXT,
        },
        rating: {
          type: DataTypes.INTEGER,
        },
        status: {
          type: DataTypes.ENUM('in stock', 'out of stock'),
          allowNull: false,
        },

        identityNumber: {
            type: DataTypes.STRING,
            allowNull: true, // HSN, IMEI, etc.
            // comment: 'HSN for laptops, IMEI for smartphones, etc.', // Optional field comment for clarity
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
              model: 'categoriess',  // Correct table name
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
    };
  
    return Products;
  };
  