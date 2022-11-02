const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
    favorite:{
        type:Boolean
    },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdById:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy:{
    type: String,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("favorite", FavoriteSchema);