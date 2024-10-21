const db = require('../models');
const { Op } = require('sequelize');
const { Authenticate } = require('../middleware/Authenticate')


exports.addAddress = async (req, res) => {
  try {
    const { userId,  name, phone, addressLine1, addressLine2, city, state, postalCode, country, type, isDefault } = req.body;
    
//  console.log(req.body);
//  console.log(req.user);


    const newAddress = await db.address.create({
      userId,
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      type, 
      isDefault 
    });


    // console.log(newAddress);
    
    res.status(200).json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding address',
    });
  }
};

// Get all addresses for the current user
exports.getUserAddresses = async (req, res) => {
  try {
    const  userId =  req.user;
    console.log(userId);
    const addresses = await db.address.findAll({
      where: { userId },
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching addresses',
    });
  }
};

// Get a single address
exports.getSingleAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await db.address.findOne({
      where: { id, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching address',
    });
  }
};

// Update an address by ID
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, addressLine1, addressLine2, city, state, postalCode, country, type } = req.body;

    const address = await db.address.findOne({
      where: { id, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    await address.update({
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      type: type || address.type, // Update type 
    });

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      address,
    });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating address',
    });
  }
};


exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.address.destroy({
      where: { id, userId: req.user.id },
    });

    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting address',
    });
  }
};


exports.setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await db.address.findOne({
      where: { id, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    // Set all other addresses for the user as not default
    await db.address.update(
      { isDefault: false },
      { where: { userId: req.user.id } }
    );

    // Set the selected address as default
    await address.update({ isDefault: true });

    res.status(200).json({
      success: true,
      message: 'Address set as default',
      address,
    });
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({
      success: false,
      message: 'Error setting default address',
    });
  }
};
