const { Category } = require('../models');

// Create a new category
// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, top_category } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    const category = await Category.create({
      name,
      slug,
      top_category,
    });
  

    return res.status(201).json({
      success:true,
      category
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};


// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({
      success:true,
      categories
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json({
      success:true,
      category
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, top_category } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.top_category = top_category !== undefined ? top_category : category.top_category;

    await category.save();

    return res.status(200).json({
      success:true,
      category
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();

    return res.status(200).json({success:true, message: 'Category deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete category' });
  }
};
