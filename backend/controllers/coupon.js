const db = require('../models');
<<<<<<< HEAD
=======
const { Op } = require('sequelize');


>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9

// Add a new coupon
exports.addCoupon = async (req, res, next) => {
  try {
    const { code, amount, active, expired } = req.body;

    const coupon = await db.coupon.create({
      code,
      amount,
      active,
      expired
    });


    res.status(200).json({
      message: "Coupon added successfully",
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("Error adding coupon:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Get all coupons
<<<<<<< HEAD
exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await db.coupon.findAll();
=======
// exports.getAllCoupons = async (req, res, next) => {
//   try {
//     const coupons = await db.coupon.findAll();
//     res.status(200).json({
//       success: true,
//       coupons,
//     });
//   } catch (error) {
//     console.error("Error fetching coupons:", error); 
//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// };



exports.getAllCoupons = async (req, res, next) => {
  try {
    const { code, minAmount, maxAmount, activeFrom, activeTo, expiredFrom, expiredTo } = req.query;

    const filterOptions = {};

  
    if (code) {
      filterOptions.code = { [Op.like]: `%${code}%` }; 
    }

    // Filter by amount range
    if (minAmount && maxAmount) {
      filterOptions.amount = { [Op.between]: [minAmount, maxAmount] };
    } else if (minAmount) {
      filterOptions.amount = { [Op.gte]: minAmount };
    } else if (maxAmount) {
      filterOptions.amount = { [Op.lte]: maxAmount };
    }

    // Filter by active date range
    if (activeFrom && activeTo) {
      filterOptions.active = { [Op.between]: [activeFrom, activeTo] };
    } else if (activeFrom) {
      filterOptions.active = { [Op.gte]: activeFrom };
    } else if (activeTo) {
      filterOptions.active = { [Op.lte]: activeTo };
    }

    // Filter by expired date range
    if (expiredFrom && expiredTo) {
      filterOptions.expired = { [Op.between]: [expiredFrom, expiredTo] };
    } else if (expiredFrom) {
      filterOptions.expired = { [Op.gte]: expiredFrom };
    } else if (expiredTo) {
      filterOptions.expired = { [Op.lte]: expiredTo };
    }

    // Fetch filtered coupons
    const coupons = await db.coupon.findAll({
      where: filterOptions,
    });

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching coupons:", error); 
=======
    console.error("Error fetching filtered coupons:", error);
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

<<<<<<< HEAD
=======



>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
// Get a single coupon by ID
exports.getSingleCoupon = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coupon = await db.coupon.findByPk(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("Error fetching coupon:", error); 
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
<<<<<<< HEAD
=======


>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
exports.deleteCoupon = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const result = await db.coupon.destroy({
        where: { id }
      });
      
   
      
  
      if (result === 0) {
        return res.status(404).json({
          success: false,
          message: "Coupon not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting coupon:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };