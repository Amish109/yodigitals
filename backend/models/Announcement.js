module.exports = (sequelize, DataTypes) => {
    const Announcement = sequelize.define(
      "Announcement",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true, 
        },
       
        title: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
          },
          images: {  
            type: DataTypes.JSONB, 
            allowNull: true,
          },
      },
      {
        tableName: "announcements",
        timestamps: true,  
      }
    );
  
    return Announcement;
  };
  