const homeController = require("../controllers/home");
const Blog = require("../models/Blog");
const Favorite = require("../models/Favorites");
module.exports = {
  getIndex: (req, res) => {
    //console.log(req)
    res.render("home.ejs");
  },

  getHome:async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: "desc" }).lean();
      const favorites = await Favorite.find().lean();
      res.render("home.ejs", { blogs: blogs,favorites: favorites });
    } catch (err) {
      console.log(err);
    }
  },
};
