const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const blogsController = require("../controllers/blogs");
const favoritesController = require("../controllers/favorites");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/createBlog", ensureAuth, blogsController.getForm);
//router.get("/:id", ensureAuth, blogsController.getBlog);
router.post("/createBlog", upload.single("file"), blogsController.createBlog);
router.get("/popularBlogs",blogsController.getPopular);
router.get("/:id", ensureAuth,blogsController.getBlog);
router.put("/likeBlog/:id", blogsController.likeBlog);
router.delete("/deleteBlog/:id", blogsController.deleteBlog);
router.post("/favoriteBlog/:id", favoritesController.favoriteBlog)
router.post("/favoriteBlogHome/:id", favoritesController.favoriteBlogHome)
module.exports = router;