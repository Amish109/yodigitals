const Joi = require("joi");
const db = require("../models");

// @DES ADD NEW ProductEnq:
// POST API

exports.addNewProductEnq = async (req, res) => {
  const input = req.body;

  const rules = Joi.object({
    enquiry_date: Joi.date().required().messages({
      "date.base": "Enquiry date must be a valid date",
      "any.required": "Enquiry date is required",
    }),
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
    contact: Joi.string().allow(null, ''),
    email: Joi.string().email().allow(null, ''),
    bname: Joi.string().allow(null, ''),
    bgst: Joi.string().allow(null, ''),
    address: Joi.string().allow(null, ''),
    unit: Joi.string().allow(null, ''),
    status: Joi.boolean().allow(null),
    title: Joi.string().allow(null, '')
  });

  const { error } = rules.validate(input, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: error.details.map((detail) => detail.message),
    });
  }

  try {
    const ProductEnqCreated = await db.ProductEnq.create({
      enquiry_date: input.enquiry_date,
      name: input.name,
      contact: input.contact,
      email: input.email,
      bname: input.bname,
      bgst: input.bgst,
      address: input.address,
      unit: input.unit,
      status: input.status,
      title: input.title,
    });

  
    res.status(200).json({
      success: true,
      message: "ProductEnq created successfully...",
      ProductEnqCreated,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @ DES LIST ProductEnq LIST
// GET API
exports.ProductEnqList = async (req, res) => {
  try {
    const productEnqs = await db.ProductEnq.findAll();

    if (productEnqs && productEnqs.length > 0) {
      res.status(200).json({
        success: true,
        productEnqs, 
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No product enquiries found.",
      });
    }
  } catch (error) {
    console.error("Error fetching product enquiries:", error); 
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving product enquiries.",
    });
  }
};



// @ DES SINGLE  ProductEnq 
// GET API
exports.SingleProductEnq = async (req, res) => {
  try {
    const id = req.params.id;

    
    const ProductEnq = await db.ProductEnq.findByPk(id);

    if (ProductEnq) {
      res.status(200).json({
        success: true,
        ProductEnq: ProductEnq,
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


// @ DES DELETE  ProductEnq 
// DELETE API
exports.DeleteProductEnq = async (req, res) => {
  try {
    const id = req.params.id;

    
    const ProductEnq = await db.ProductEnq.findByPk(id);
    

    if (ProductEnq) {
       await ProductEnq.destroy();
       res.status(200).json({
        success:true,
        message:"ProductEnq deleted successfully"
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
