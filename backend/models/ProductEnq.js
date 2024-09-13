

module.exports = function (sequelize, DataTypes) {
    const productenq = sequelize.define(
      "productenq",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          },
          enquiry_date: {
            type: DataTypes.DATE,
          },
          name: {
            type: DataTypes.STRING,
          },
          contact: {
            type: DataTypes.STRING,
          },
          email: {
            type: DataTypes.STRING,
          },
          bname: {
            type: DataTypes.STRING,
          },
          bgst: {
            type: DataTypes.STRING,
          },
          address: {
            type: DataTypes.STRING,
          },
          unit: {
            type: DataTypes.STRING,
          },
          status:{
            type: DataTypes.BOOLEAN,
          },
          title:{
            type: DataTypes.STRING,
          }
      },
      {
        timestamps: true,
        paranoid: true,
        tableName: "productenq",
      }
    );
  
   
  
    return productenq;
  };
  