const express = require("express");
const { addNewbrand, BrandList, SingleBrand, DeleteBrand } = require("../controllers/brandController");


const router = express.Router();

// routing
router.route("/add").post(addNewbrand);
router.route("/list").get(BrandList);
router.route("/:id").get(SingleBrand);
router.route("/:id").delete(DeleteBrand);

module.exports = router;
