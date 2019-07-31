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
router.post("/", function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = { name: name, image: image, description: description };
  let newCampground = { name: name, image: image, description: description };
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
router.get("/new", function(req, res) {
  res.render("/new.ejs");
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

module.exports = router;
