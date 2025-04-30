const express = require("express");
const controller = require("../controllers/itemController");
const { upload, onError } = require("../middleware/fileUpload");
const { validateId, validateItem, validateEditItem, validateResult } = require("../middleware/validator");
const { isLoggedIn, isSeller } = require("../middleware/auth");
const offerRouter = require("./offerRoutes");
const { validate } = require("../models/user");
const router = express.Router();

// Get all items
router.get("/", controller.index);

// New item form
router.get("/new", isLoggedIn, controller.new);

// Search by keyword
router.get("/search", controller.search);

// Create new item
router.post("/", isLoggedIn, upload, onError, validateItem, validateResult, controller.create);

// Show item by id
router.get("/:id", validateId, controller.show);

// Edit item by id
router.get("/:id/edit", validateId, isLoggedIn, isSeller, controller.edit);

// Update item by id
router.put("/:id", validateId, isLoggedIn, isSeller, upload, onError, validateEditItem, validateResult, controller.update);

// Delete item by id
router.delete("/:id", isLoggedIn, isSeller, validateId, controller.delete);

router.use("/:id/offers", validateId, offerRouter); // Router inception

module.exports = router;