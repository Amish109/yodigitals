const express = require("express");
const ProductEnq = require("../models/Categories");
const { addNewCategories, categoriesList, Singlecategories, Deletecategories } = require("../controllers/categoriesController");


const router = express.Router();

// routing
router.route("/add").post(addNewCategories);
router.route("/list").get(categoriesList);
router.route("/:id").get(Singlecategories);
router.route("/:id").delete(Deletecategories);

module.exports = router;
