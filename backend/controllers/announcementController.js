const { Announcement } = require('../models');

// Create Announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePaths = req.files.map(file => file.path);

    const announcement = await Announcement.create({
      title,
      description,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      announcement,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating announcement',
      error: error.message,
    });
  }
};

// Get All Announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    return res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching announcements',
      error: error.message,
    });
  }
};

// Get Single Announcement by ID
exports.getSingleAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        message: 'Announcement not found',
      });
    }

    return res.status(200).json({
      success: true,
      announcement,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching announcement',
      error: error.message,
    });
  }
};

// Update Announcement by ID
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imagePaths = req.files.map(file => file.path);

    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        message: 'Announcement not found',
      });
    }

    announcement.title = title;
    announcement.description = description;
    announcement.images = imagePaths;

    await announcement.save();

    return res.status(200).json({
      success: true,
      announcement,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating announcement',
      error: error.message,
    });
  }
};

// Delete Announcement by ID
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        message: 'Announcement not found',
      });
    }

    await announcement.destroy();

    return res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting announcement',
      error: error.message,
    });
  }
};
