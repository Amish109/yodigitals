const db = require('../models');

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
exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await db.coupon.findAll();
    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error); 
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

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