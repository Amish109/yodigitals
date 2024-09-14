const Joi = require("joi");
const db = require("../models");


// POST API
exports.addNewUser = async (req, res) => {
  const input = req.body;


  const rules = {
    firstName: Joi.string().required().messages({
        "string.base": "First name must be a string",
        "any.required": "First name is required",
      }),
      lastName: Joi.string().required().messages({
        "string.base": "Last name must be a string",
        "any.required": "Last name is required",
      }),
      phoneNumber: Joi.string().required().messages({
        "string.base": "Phone number must be a string",
        "any.required": "Phone number is required",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email",
        "any.required": "Email is required",
      }),
      role: Joi.string().valid("user", "admin").required().messages({
        "string.base": "Role must be a string",
        "any.required": "Role is required",
        "any.only": "Role must be either 'user' or 'admin'",
      }),
      password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "any.required": "Password is required",
      }),
      disabled: Joi.boolean().optional(),
      emailVerified: Joi.boolean().optional(),
      emailVerificationToken: Joi.string().optional(),
      emailVerificationTokenExpiresAt: Joi.date().optional(),
      passwordResetToken: Joi.string().optional(),
      passwordResetTokenExpiresAt: Joi.date().optional(),
      provider: Joi.string().optional(),
      importHash: Joi.string().optional(),
      aadhar_number: Joi.string().optional(),
      aadhar_front_url: Joi.string().optional(),
      aadhar_back_url: Joi.string().optional(),
      pan_number: Joi.string().optional(),
      pan_url: Joi.string().optional(),
      otp_code: Joi.string().optional(),
      otp_expiration: Joi.date().optional(),
      otp_verified: Joi.boolean().optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
      createdById: Joi.string().optional(),
      updatedById: Joi.string().optional(),
      deletedAt: Joi.date().optional(),
  };

  const { error } = Joi.object(rules).validate(input, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: error.details.map((detail) => detail.message),
    });
  }

  try {
    const userData = {
      id: input.id || undefined,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password, 
      role: input.role,
      disabled: input.disabled || false,
      emailVerified: input.emailVerified || false,
      provider: input.provider || null,
    };
 console.log(userData);
    // Create a new user
   
    const userCreated = await db.User.create(userData);

    res.status(200).json({
      success: true,
      message: "User created successfully...",
      userCreated,
    });
  } catch (error) {
    console.error("Error:", error);
    
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// @DES LIST all users
// GET API
exports.userList = async (req, res) => {
  try {
    const users = await db.User.findAll();

    if (users && users.length > 0) {
      res.status(200).json({
        success: true,
        users,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @DES GET single user by ID
// GET API
exports.singleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id);

    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// DELETE API
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id);

    if (user) {
      await user.destroy();
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// PUT API
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const input = req.body;

  const rules = {
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional(),
    password: Joi.string().optional(), 
    role: Joi.string().valid('admin', 'staff', 'users', 'retailers').optional(),
  };

  const { error } = Joi.object(rules).validate(input, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: error.details.map((detail) => detail.message),
    });
  }

  try {
    const user = await db.User.findByPk(id);

    if (user) {
      await user.update(input);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
