const homeController = require("../controllers/home");
const Post = require("../models/Post");
module.exports = {
  getIndex: (req, res) => {
    //console.log(req)
    res.render("home.ejs");
  },

  getHome:async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("home.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
};
