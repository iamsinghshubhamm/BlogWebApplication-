const express = require("express");
const router = express.Router();
const {
  getBlog,
  createBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
  getUserBlog,
} = require("../controller/blogController");
const {
  registerController,
  getAllUser,
  loginController,
} = require("../controller/authController");

// Creating route
router.get("/getblog/:id", getBlog);
router.get("/getallblog", getAllBlog);
router.post("/createblog", createBlog);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", updateBlog);
router.get('/getuserblog/:id', getUserBlog)

// Authentication route
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getallusers", getAllUser);

module.exports = router;
