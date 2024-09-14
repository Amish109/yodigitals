const express = require("express");
const { 
  addNewUser, 
  userList, 
  singleUser, 
  deleteUser, 
  updateUser 
} = require("../controllers/usersController");

const router = express.Router();

// User routing
router.route("/add").post(addNewUser);  // Add new user
router.route("/list").get(userList);    // List all users
router.route("/:id").get(singleUser);   // Get single user by ID
router.route("/:id").delete(deleteUser); // Delete user by ID
router.route("/:id").put(updateUser);   // Update user by ID

module.exports = router;
