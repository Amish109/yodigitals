const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const invoiceController = require('../controllers/invoiceController');

router.post('/add', upload.array('files'), invoiceController.uploadInvoice);

router.get('/list', invoiceController.getAllInvoices);

router.get('/:id', invoiceController.viewInvoice);
router.delete('/:id', invoiceController.deleteInvoice);


module.exports = router; 
