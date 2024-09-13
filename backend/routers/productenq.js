const express = require("express");
const { addNewProductEnq, SingleProductEnq, DeleteProductEnq, ProductEnqList } = require("../controllers/productenqController");
const ProductEnq = require("../models/ProductEnq");


const router = express.Router();

// routing
router.route("/add").post(addNewProductEnq);
router.route("/list").get(ProductEnqList);
router.route("/:id").get(SingleProductEnq);
router.route("/:id").delete(DeleteProductEnq);

module.exports = router;
