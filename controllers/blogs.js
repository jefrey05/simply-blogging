const cloudinary = require("../middleware/cloudinary");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment")

module.exports = {
  getForm: async (req, res) => {
    //console.log(req.user)
    try {
      const blogs = await Blog.find({ user: req.user.id });
      res.render("form.ejs", { blogs:blogs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createBlog: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Blog.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/blog/createBlog");
    } catch (err) {
      console.log(err);
    }
  },

  getBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      const comments = await Comment.find({blog: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("blog.ejs", { blog: blog, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },

  getPopular: async (req, res) => {
    //console.log(req.user)
    try {
      
      res.render("popularBlogs.ejs");
    } catch (err) {
      console.log(err);
    }
  },
}