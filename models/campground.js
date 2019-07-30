var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  //   location: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// MODEL SETUP
module.exports = mongoose.model("Campground", campgroundSchema);
