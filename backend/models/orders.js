module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define(
      'Orders',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        order_date: {
          type: DataTypes.DATE,
        },
        amount: {
          type: DataTypes.NUMERIC,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('inprocess', 'dispatched', 'intransit', 'delivered', 'pending', 'completed', 'cancelled', 'rejected'),
          allowNull: false,
        },
        importHash: {
          type: DataTypes.STRING(255),
          unique: true,
        },
        order_no: {
          type: DataTypes.TEXT,
        },

        // productId : {
        //     type: DataTypes.UUID,
        // },
        
        // products: {
        //   type: DataTypes.JSON,
        // },

        paymentId: {
            type: DataTypes.UUID,
        },
        payment_status: {
          type: DataTypes.ENUM('pending', 'paid', 'failed'),
          defaultValue: 'pending',
        },
        coupon_code: {
          type: DataTypes.STRING,
        },
        overall_distributor_price: {
          type: DataTypes.NUMERIC,
        },
        shipping_method: {
          type: DataTypes.STRING,
        },
        payment_method: {
          type: DataTypes.STRING,
        },
        customer_note: {
          type: DataTypes.TEXT,
        },
        currency: {
          type: DataTypes.STRING,
        },
        discount_amount: {
          type: DataTypes.NUMERIC,
        },
        tax_amount: {
          type: DataTypes.NUMERIC,
        },
        shipping_address: {
          type: DataTypes.TEXT,
        },
        billing_address: {
          type: DataTypes.TEXT,
        },
        order_type: {
          type: DataTypes.STRING,
        },
        delivery_date: {
          type: DataTypes.DATE,
        },
        tracking_number: {
          type: DataTypes.STRING,
        },
        order_source: {
          type: DataTypes.STRING,
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
      },
      {
        tableName: 'orders',
        timestamps: true,
        paranoid: true,
      }
    );
  
    Orders.associate = function (models) {
      Orders.belongsTo(models.User, {
        foreignKey: 'createdById',
        as: 'createdBy',
      });
      Orders.belongsTo(models.User, {
        foreignKey: 'updatedById',
        as: 'updatedBy',
      });
      Orders.hasMany(models.OrderDetails, {
        foreignKey: 'order_id',
        as: 'orderDetails',
      });
    };
  
    return Orders;
  };
  