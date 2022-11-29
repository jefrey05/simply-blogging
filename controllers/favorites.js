const cloudinary = require("../middleware/cloudinary");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorites");

module.exports = {
  favoriteBlog: async (req, res) => {
    try {
      await Favorite.create({
        favorite: true,
        blog: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
      });
      res.redirect(`/blog/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  favoriteBlogHome: async (req, res) => {
    try {
      let blog = await Favorite.find({
        blog: req.params.id,
      });
      console.log(blog.length);
      if (blog.length == 0) {
        await Favorite.create({
          favorite: true,
          blog: req.params.id,
          createdBy: req.user.userName,
          createdById: req.user.id,
        });
      }
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
};
