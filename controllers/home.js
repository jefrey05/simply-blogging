module.exports = {
  getIndex: (req, res) => {
    //console.log(req)
    res.render("home.ejs");
  },

  getHome:(req, res)=>{

    res.render("home.ejs")
  },
  
};
