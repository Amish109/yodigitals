const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const announcementsController = require('../controllers/announcementController');
const upload = require('../middleware/multer');

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.post('/', upload.array('images', 10), announcementsController.createAnnouncement); 

router.get('/', announcementsController.getAllAnnouncements);
router.get('/:id', announcementsController.getSingleAnnouncement);
router.put('/:id', upload.array('images', 10), announcementsController.updateAnnouncement);
router.delete('/:id', announcementsController.deleteAnnouncement);

module.exports = router;
