const express = require('express');
const router = express.Router();
const businessInfoController = require('../controllers/businessInfoController'); 


router.post('/', businessInfoController.createBusinessInfo); 
router.get('/', businessInfoController.getAllBusinessInfos);  
router.get('/:id', businessInfoController.getBusinessInfoById); 
router.put('/:id', businessInfoController.updateBusinessInfo);  
router.delete('/:id', businessInfoController.deleteBusinessInfo); 

module.exports = router;
