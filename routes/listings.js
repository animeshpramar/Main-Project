const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner} = require("../middleware.js");
const{validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//adding new listing  and  index route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing),
);

//new listing route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//getting details of any listing  (show route)  and   update Route  and   Delete Listing route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)
);


//update(Edit Route)
router.get("/id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;