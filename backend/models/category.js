module.exports = (sequelize, DataTypes) => {


    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.TEXT, 
        allowNull: true,
        
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,  
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      top_category: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      tableName: 'categories',
      timestamps: true,  
    });
  
    return Category;
  };
  