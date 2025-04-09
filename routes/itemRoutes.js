const express = require("express");
const controller = require("../controllers/itemController");
const { upload, onError } = require("../middleware/fileUpload");
const { validateId } = require("../middleware/validator");
const router = express.Router();

// Get all items
router.get("/", controller.index);

// New item form
router.get("/new", controller.new);

// Search by keyword
router.get("/search", controller.search);

// Create new item
router.post("/", upload, onError, controller.create);

// Show item by id
router.get("/:id", validateId, controller.show);

// Edit item by id
router.get("/:id/edit", validateId, controller.edit);

// Update item by id
router.put("/:id", upload, validateId, controller.update);

// Delete item by id
router.delete("/:id", validateId, controller.delete);

module.exports = router;