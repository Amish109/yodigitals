const { BusinessInfo } = require('../models'); // Ensure this path is correct for your setup

// Create a new business info
exports.createBusinessInfo = async (req, res) => {
  try {
    const { user_id, business_name, business_address, gst_number, cin, due_date, turnover } = req.body;
    const newBusinessInfo = await BusinessInfo.create({
      user_id,
      business_name,
      business_address,
      gst_number,
      cin,
      due_date,
      turnover,
    });
    res.status(201).json(newBusinessInfo);
  } catch (error) {
    console.error('Error creating business info:', error);
    res.status(500).json({ error: 'An error occurred while creating business info' });
  }
};

// Get all business info records
exports.getAllBusinessInfos = async (req, res) => {
    try {
      const businessInfos = await BusinessInfo.findAll({
        where: {
          deletedAt: null
        }
      });
      res.status(200).json(businessInfos);
    } catch (error) {
      console.error('Error fetching business infos:', error);
      res.status(500).json({ error: 'An error occurred while fetching business infos' });
    }
  };
  
  // Get a single business info by ID
  exports.getBusinessInfoById = async (req, res) => {
    try {
      const { id } = req.params;
      const businessInfo = await BusinessInfo.findOne({
        where: {
          id,
          deletedAt: null
        }
      });
      if (businessInfo) {
        res.status(200).json(businessInfo);
      } else {
        res.status(404).json({ message: 'Business info not found or has been deleted' });
      }
    } catch (error) {
      console.error('Error fetching business info by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching business info' });
    }
  };
  
  // Update a business info record by ID
  exports.updateBusinessInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, business_name, business_address, gst_number, cin, due_date, turnover } = req.body;
  
      const [updated] = await BusinessInfo.update(
        { user_id, business_name, business_address, gst_number, cin, due_date, turnover },
        { where: { id, deletedAt: null }, returning: true }
      );
  
      if (updated[0]) {
        const updatedBusinessInfo = await BusinessInfo.findByPk(id);
        res.status(200).json(updatedBusinessInfo);
      } else {
        res.status(404).json({ message: 'Business info not found or has been deleted' });
      }
    } catch (error) {
      console.error('Error updating business info:', error);
      res.status(500).json({ error: 'An error occurred while updating business info' });
    }
  };
  
  // Soft delete a business info record by ID
  exports.deleteBusinessInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await BusinessInfo.update(
        { deletedAt: new Date() },
        { where: { id } }
      );
  
      if (updated[0]) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Business info not found' });
      }
    } catch (error) {
      console.error('Error deleting business info:', error);
      res.status(500).json({ error: 'An error occurred while deleting business info' });
    }
  };