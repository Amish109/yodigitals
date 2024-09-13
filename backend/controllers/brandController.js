const Joi = require("joi");
const db = require("../models");

// @DES ADD NEW brand:
// POST API

exports.addNewbrand = async (req, res) => {
  const input = req.body;

  const rules = {
    title: Joi.string().messages({
        "string.base": "brand must be a required",
      }),
      name: Joi.string().messages({
        "string.base": "name must be a required",
      }),
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
    const brandData = {
      id: input.id || undefined,
      name: input.name || null,
      importHash: input.importHash || null,
      // createdById: currentUser.id,
      // updatedById: currentUser.id,
    };

    

    // Create a new brand
    const brandCreated = await db.Brand.create(brandData);

    res.status(200).json({
      success: true,
      message: "Brand created successfully...",
      brandCreated,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// @ DES LIST brand LIST
// GET API
exports.BrandList = async (req, res) => {
  try {
    const brand = await db.Brand.findAll();

    if (brand && brand.length > 0) {
      res.status(200).json({
        success: true,
        brand: brand,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};



// @ DES SINGLE  brand 
// GET API
exports.SingleBrand = async (req, res) => {
  try {
    const id = req.params.id;

    
    const brand = await db.Brand.findByPk(id);

    if (brand) {
      res.status(200).json({
        success: true,
        brand: brand,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};


// @ DES DELETE  brand 
// DELETE API
exports.DeleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    
    const brand = await db.Brand.findByPk(id);
    

    if (brand) {
       await brand.destroy();
       res.status(200).json({
        success:true,
        message:"Brand deleted successfully"
       })
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::END::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
