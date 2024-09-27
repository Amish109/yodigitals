const bcrypt = require('bcrypt');
const { User, BusinessInfo  } = require('../models'); 
const Token = require('../utils/Token');
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');
const { Op } = require('sequelize');



// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, role, password, aadhar_number, pan_number } = req.body;

    const allowedRoles = ['admin', 'staff', 'users','retailers'];

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role provided. Allowed roles are: ${allowedRoles.join(', ')}` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      role,
      password: hashedPassword,
      aadhar_number,
      pan_number
    });

    const token = Token.generateJWT(newUser._id);

    res.status(201).json({
      success:true,
      newUser,token
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = Token.generateJWT(user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        aadhar_number:user.aadhar_number,
        pan_number:user.pan_number,
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An error occurred while logging in the user' });
  }
};



exports.loginPhone = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }
    const user = await User.findOne({ where: { phoneNumber } });
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = Token.generateJWT(user.id);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        aadhar_number: user.aadhar_number,
        pan_number: user.pan_number,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An error occurred while logging in the user' });
  }
};




exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { deletedAt: null },
      include: [
        {
          model: BusinessInfo,
          as: 'businessInfo'
        }
      ]
    });
    res.status(200).json({
      success:true,
     users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Get user by ID with associated BusinessInfo
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id, deletedAt: null },
      include: [
        {
          model: BusinessInfo,
          as: 'businessInfo'
        }
      ]
    });

    if (user) {
      res.status(200).json({
        success:true,
        user
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, email, role, password, aadhar_number, pan_number } = req.body;

    const updateData = { firstName, lastName, phoneNumber, email, role, aadhar_number, pan_number };

    // If the password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const [updated] = await User.update(updateData, {
      where: { id, deletedAt: null }, // Exclude soft-deleted users
      returning: true
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json({
        success:true,
        updatedUser
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Soft delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await User.update(
      { deletedAt: new Date() },
      { where: { id } }
    );

    if (updated) {
     res.status(200).json({
      success:true,
      message:"User deleted successfully"
     })
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};




// Change user password
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.user; 
    console.log(req.user);

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    
    await user.save();

    const token = Token.generateJWT(user.id);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      token, 
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'An error occurred while changing the password' });
  }
};





// Forgot Password Controller
// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 10 * 60 * 1000; 
  
  
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiresAt = resetTokenExpires;

    await user.save(); // Save the changes

    const resetURL = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #000000; text-align: center;">Welcome to Yo Digitals</h1>
      <h2 style="color: #333333;">Reset Your Password</h2>
      <p style="color: #555555;">Hi,</p>
      <p style="color: #555555;">Please follow this link to reset your password. This link is valid for 10 minutes from now:</p>
      <a href='http://localhost:3000/admin/reset-password/${resetToken}' style="display: inline-block; background-color: #000000; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Click Here</a>
      <p style="color: #555555; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
    </div>
    <footer style="text-align: center; margin-top: 20px; color: #888888;">
      <p>Thank you!</p>
    </footer>
  </div>
`;

  
    
    const data = {
      to: user.email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL, 
    };
    
    sendEmail(data);

    res.status(200).json({ success: true, message: 'Password reset link sent to email', resetToken });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};





// Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { token } = req.params; 
  const { newPassword, confirmPassword } = req.body;

  try {
 
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired password reset token' });
    }

    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

  
    user.passwordResetToken = null;
    user.passwordResetTokenExpiresAt = null;

   
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
};
