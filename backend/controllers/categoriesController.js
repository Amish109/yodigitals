const Joi = require("joi");
const db = require("../models");

// @DES ADD NEW categories:
// POST API


exports.addNewCategories = async (req, res) => {
  const input = req.body;

  // Define validation rules
  const rules = Joi.object({
    title: Joi.string().required().messages({
      "string.base": "Title must be a string",
      "any.required": "Title is required",
    }),
    meta_description: Joi.string().allow(null, '').optional(),
    keywords: Joi.string().allow(null, '').optional(),
    meta_author: Joi.string().allow(null, '').optional(),
    meta_og_title: Joi.string().allow(null, '').optional(),
    meta_og_url: Joi.string().allow(null, '').optional(),
    meta_og_image: Joi.string().allow(null, '').optional(),
    meta_fb_id: Joi.string().allow(null, '').optional(),
    meta_og_sitename: Joi.string().allow(null, '').optional(),
    post_twitter: Joi.string().allow(null, '').optional(),
    importHash: Joi.string().allow(null, '').optional(),
  });

  // Validate the input using Joi
  const { error } = rules.validate(input, { abortEarly: false });

  // Return validation errors if any
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: error.details.map((detail) => detail.message),
    });
  }

  try {
    // Create the new category record
    const categoriesCreated = await db.Categories.create({
      title: input.title,
      meta_description: input.meta_description || null,
      keywords: input.keywords || null,
      meta_author: input.meta_author || null,
      meta_og_title: input.meta_og_title || null,
      meta_og_url: input.meta_og_url || null,
      meta_og_image: input.meta_og_image || null,
      meta_fb_id: input.meta_fb_id || null,
      meta_og_sitename: input.meta_og_sitename || null,
      post_twitter: input.post_twitter || null,
      importHash: input.importHash || null,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Category created successfully.",
      categoriesCreated,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// @ DES LIST categories LIST
// GET API
exports.categoriesList = async (req, res) => {
  try {
    const categoriess = await db.Categories.findAll();

    if (categoriess && categoriess.length > 0) {
      res.status(200).json({
        success: true,
        categoriess, 
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



// GET API
exports.Singlecategories = async (req, res) => {
  try {
    const id = req.params.id;

    
    const categories = await db.Categories.findByPk(id);

    if (categories) {
      res.status(200).json({
        success: true,
        categories: categories,
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


// @ DES DELETE  categories 
// DELETE API
exports.Deletecategories = async (req, res) => {
  try {
    const id = req.params.id;

    
    const categories = await db.Categories.findByPk(id);
    

    if (categories) {
       await categories.destroy();
       res.status(200).json({
        success:true,
        message:"categories deleted successfully"
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
