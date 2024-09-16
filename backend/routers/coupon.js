
const express = require('express');
const { addcoupon, getAllcoupon, getSinglecoupon, addCoupon, getAllCoupons, getSingleCoupon, deleteCoupon } = require('../db/api/coupon');
const router = express.Router();



router.post('/add', addCoupon);
router.get('/list', getAllCoupons);
router.get('/:id', getSingleCoupon);
router.delete('/:id', deleteCoupon);


module.exports = router;
