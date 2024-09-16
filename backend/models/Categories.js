module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define(
      "categories",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.TEXT,
        
        },
        meta_description: {
          type: DataTypes.TEXT,
        },
        keywords: {
          type: DataTypes.TEXT,
        },
        meta_author: {
          type: DataTypes.TEXT,
        },
        meta_og_title: {
          type: DataTypes.TEXT,
        },
        meta_og_url: {
          type: DataTypes.TEXT,
        },
        meta_og_image: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        meta_fb_id: {
          type: DataTypes.TEXT,
        },
        meta_og_sitename: {
          type: DataTypes.TEXT,
        },
        post_twitter: {
          type: DataTypes.TEXT,
        },
        importHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: true,
        },
      },
      {
        tableName: "categoriess",
        timestamps: true,
      }
    );
  


    categories.associate = function (models) {
     categories.hasMany(models.Products, {
        foreignKey: 'categoryId', 
        as: 'products', 
      });
    };


    return categories;
  };
  