const express = require("express");
const controller = require("../controllers/offerController");
const { isLoggedIn, isSeller, isOfferer, isNotSeller, itemIsActive } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

// Make an offer
router.post("/", isLoggedIn, isNotSeller, itemIsActive, controller.create);

// View all offers
router.get("/", isLoggedIn, isSeller, controller.index);

router.put("/:offer_id", isLoggedIn, isOfferer, itemIsActive, controller.update);
router.delete("/:offer_id", isLoggedIn, isOfferer, itemIsActive, controller.delete);

router.post("/:offer_id/accept", isLoggedIn, isSeller, itemIsActive, controller.accept);
router.post("/:offer_id/reject", isLoggedIn, isSeller, itemIsActive, controller.reject);

module.exports = router;