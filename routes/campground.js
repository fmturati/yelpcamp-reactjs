var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX ROUTE - Show All Campgrounds
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
});

// CREATE ROUTE - Add New Camp to DB
router.post("/", isLoggedIn, function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
  };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log("OPS!", err);
    } else {
      console.log("Camp Added", newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

// NEW ROUTE - Show Form to Create New Camp
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new.ejs");
});

// SHOW ROUTE - Show More info about an Unique Camp
router.get("/:id", function(req, res) {
  //find the id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        res.render("campgrounds/show.ejs", { campground: foundCampground });
      }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
