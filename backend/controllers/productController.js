const { Products, Brand, User } = require('../models'); // Assuming these models are already defined
// const { Op } = require('sequelize');


exports.createProduct = async (req, res) => {
  try {
    const { title, price, discount, description, rating, identityNumber, categoryId, status, brandId, createdById, distributor_price, stock } = req.body;
    
// console.log("Products is :", title);
console.log("Category is:", categoryId);

    const products = await Products.create({
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
      stock
    });

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        { model: Brand, as: 'brand' }, 
        { model: User, as: 'createdBy' }, 
        { model: User, as: 'updatedBy' } 
      ]
    });
    res.status(200).json(products);
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
    const productId = req.params.id;
    const { title, price, discount, description,  identityNumber, rating, status, categoryId, brandId, updatedById, distributor_price, stock } = req.body;
    
    const product = await Products.findByPk(productId);

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
      categoryId,
      identityNumber,
      updatedById,
      distributor_price,
      stock
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
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

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};