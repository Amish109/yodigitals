const bcrypt = require('bcrypt');
const { User, BusinessInfo  } = require('../models'); 
const Token = require('../utils/Token')


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
        role: user.role
      }
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
