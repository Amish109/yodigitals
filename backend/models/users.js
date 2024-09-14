module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        role: {
          type: DataTypes.ENUM('admin', 'staff', 'users', 'retailers'), 
          allowNull: true,
        },
        disabled: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        emailVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        emailVerificationToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        emailVerificationTokenExpiresAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        passwordResetToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        passwordResetTokenExpiresAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        importHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: true,
        },
        aadhar_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        aadhar_front_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        aadhar_back_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        pan_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        pan_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        otp_code: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        otp_expiration: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        otp_verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        createdById: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        updatedById: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "users",
        timestamps: true,
        paranoid: true, 
      }
    );
  
    return User;
  };
  