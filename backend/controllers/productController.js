const { Products, Brand, User , Category} = require('../models'); // Assuming these models are already defined
// const { Op } = require('sequelize');


exports.createProduct = async (req, res) => {
  try {
    const { title, price, discount, description, rating, identityNumber, categoryId, status, brandId, createdById, distributor_price, stock } = req.body;

   
    const imagePaths = req.files.map(file => file.path);

    const product = await Products.create({
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
    // Extract filters from the request query
    const { status, categorySlug } = req.query;

    // Build where condition for product filters
    const whereConditions = {};
    
    if (status) {
      whereConditions.status = status; // Filter by "in stock" or "out of stock"
    }

    const products = await Products.findAll({
      where: whereConditions, // Apply product-specific filters here
      include: [
        { model: Brand, as: 'brand' }, 
        { model: User, as: 'createdBy' }, 
        { model: User, as: 'updatedBy' },
        {
          model: Category,
          as: 'category', // Must match the alias used in the Product model association
          where: categorySlug ? { slug: categorySlug } : {}, // Filter by category slug if provided
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
