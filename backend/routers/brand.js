const express = require("express");
const { addNewbrand, BrandList } = require("../controllers/brandController");


const router = express.Router();

// routing
router.route("/add").post(addNewbrand);
router.route("/list").get(BrandList);

module.exports = router;
