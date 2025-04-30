const express = require("express");
const controller = require("../controllers/offerController");
const { isLoggedIn, isSeller, isOfferer, isNotSeller, itemIsActive } = require("../middleware/auth");
const { validateOfferId, validateOffer, validateResult } = require("../middleware/validator");
const router = express.Router({ mergeParams: true });

// Make an offer
router.post("/", isLoggedIn, isNotSeller, itemIsActive, validateOffer, validateResult, controller.create);

// View all offers
router.get("/", isLoggedIn, isSeller, controller.index);

router.put("/:offer_id", validateOfferId, isLoggedIn, isOfferer, itemIsActive, validateOffer, validateResult, controller.update);
router.delete("/:offer_id", validateOfferId, isLoggedIn, isOfferer, itemIsActive, controller.delete);

router.post("/:offer_id/accept", validateOfferId, isLoggedIn, isSeller, itemIsActive, controller.accept);
router.post("/:offer_id/reject", validateOfferId, isLoggedIn, isSeller, itemIsActive, controller.reject);

module.exports = router;