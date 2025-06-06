const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwnerOrAdmin,
  validateListing,
  upload,
} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

router.get("/search", wrapAsync(listingController.searchListings));

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    (req, res, next) => {
      upload.single("listing[image]")(req, res, function (err) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/listings/new"); // Redirect back to the form page
        }
        next();
      });
    },
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwnerOrAdmin,
    (req, res, next) => {
      upload.single("listing[image]")(req, res, function (err) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect(`/listings/${req.params.id}/edit`);
        }
        next();
      });
    },
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwnerOrAdmin,
    wrapAsync(listingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwnerOrAdmin,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
