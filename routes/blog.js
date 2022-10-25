const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const blogsController = require("../controllers/blogs");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/createBlog", ensureAuth, blogsController.getForm);
//router.get("/:id", ensureAuth, blogsController.getBlog);
router.post("/createBlog", upload.single("file"), blogsController.createBlog);
router.get("/popularBlogs",blogsController.getPopular);
module.exports = router;