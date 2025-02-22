const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

// Get all items
router.get("/", controller.index);

// New item form
router.get("/new", controller.new);

// Create new item
router.post("/", controller.create);

// Show item by id
router.get("/:id", controller.show);

// Edit item by id
router.get("/:id/edit", controller.edit);

// Update item by id
router.put("/:id", controller.update);

// Delete item by id
router.delete("/:id", controller.delete);

module.exports = router;