const homeController = require("../controllers/home");
const Blog = require("../models/Blog");
module.exports = {
  getIndex: (req, res) => {
    //console.log(req)
    res.render("home.ejs");
  },

  getHome:async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: "desc" }).lean();
      res.render("home.ejs", { blogs: blogs });
    } catch (err) {
      console.log(err);
    }
  },
};
