const { Products, Brand, User , Category} = require('../models'); // Assuming these models are already defined
// const { Op } = require('sequelize');
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const { title, price, discount, description,shortDescription, rating, identityNumber, categoryId, status, brandId, createdById, distributor_price, stock } = req.body;

    const slug = slugify(title, { lower: true });
    const imagePaths = Array.isArray(req.files)
    ? req.files.map(file => `uploads/${file.filename}`) // Save relative path
    : req.files
    ? [`uploads/${req.files.filename}`] 
    : [];

    const product = await Products.create({
      title,
      price,
      discount,
      description,
      shortDescription,
      rating,
      status,
      brandId,
      createdById,
      distributor_price,
      categoryId,
      identityNumber,
      stock,
      slug,
      images: imagePaths 
    });

    return res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating product',
      error: error.message
    });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const { status, categorySlug } = req.query;

    const whereConditions = {};
    
    if (status) {
      whereConditions.status = status;
    }

    const products = await Products.findAll({
      where: whereConditions, 
      include: [
        { model: Brand, as: 'brand' }, 
        { model: User, as: 'createdBy' }, 
        { model: User, as: 'updatedBy' },
        {
          model: Category,
          as: 'category', 
          where: categorySlug ? { slug: categorySlug } : {},
          required: false,
        }
      ]
    });

    

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};






exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findOne({
      where: { id: productId },
      include: [
        { model: Brand, as: 'brand' }, 
        { model: User, as: 'createdBy' },
        { model: User, as: 'updatedBy' }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};
 

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params; 

  
    if (!slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }

   
    const product = await Products.findOne({
      where: { slug }, 
      
    });

   
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    res.status(200).json({
      success:true,
      product
    });

  } catch (error) {
    // Catch and return any error that occurred during the process
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};






exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, discount, description, rating, identityNumber, categoryId, status, brandId, createdById, distributor_price, stock } = req.body;

    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      title,
      price,
      discount,
      description,
      rating,
      status,
      brandId,
      createdById,
      distributor_price,
      categoryId,
      identityNumber,
      stock,
      images: imagePaths.length ? imagePaths : product.images 
    });

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating product',
      error: error.message
    });
  }
};



// updated delete

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.status(200).json({ success:true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
