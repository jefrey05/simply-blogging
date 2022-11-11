const cloudinary = require("../middleware/cloudinary");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorites")
module.exports = {
  getForm: async (req, res) => {
    //console.log(req.user)
    try {
      const blogs = await Blog.find({ user: req.user.id });
      res.render("form.ejs", { blogs: blogs, user: req.user });
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
      const comments = await Comment.find({ blog: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      res.render("blog.ejs", {
        blog: blog,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getPopular: async (req, res) => {
    //console.log(req.user)
    let array = ['hi'];
    try {
      let blog = await Favorite.find({
        favorite:true,
      });
      //console.log(blog[1])
      const arrayBlogs = blog.map(element=>element.blog);
      //console.log(arrayBlogs);
      let blogies = await Blog.findById(arrayBlogs[0].toString());
      // arrayBlogs.forEach( blog=>{
      //   console.log(blog)
      //    Blog.findById(blog.toString()).then(data=>(array.push(data)))
      // })
     /// const comments = await Comment.find({ blog: req.params.id }).
     //console.log(arrayBlogs)
     let arr = [];
     for(let i = 0;i < arrayBlogs.length;i++){
      //console.log(arrayBlogs[i])
      let current = await Blog.findById(arrayBlogs[i]);
      arr = [...arr,current];
       
     }
     console.log(arr)
      res.render("popularBlogs.ejs",{
        blogs:blog,
        arrie:arr
      });
    } catch (err) {
      console.log(err);
    }
  },

  likeBlog: async (req, res) => {
    try {
      await Blog.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      //res.redirect(`/blog/${req.params.id}`);
      res.redirect('/home')
    } catch (err) {
      console.log(err);
    }
  },

  deleteBlog: async (req, res) => {
    try {
      // Find post by id
      let blog = await Blog.findById({ _id: req.params.id });
      //delete from favorites collection 
      await Favorite.deleteOne({blog:req.params.id})
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(blog.cloudinaryId);
      // Delete post from db
      await Blog.remove({ _id: req.params.id });
      console.log("Deleted Blog");
      res.redirect("/Home");
    } catch (err) {
      res.redirect("/Home");
    }
  },
  
};
