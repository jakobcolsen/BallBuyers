const model = require("../models/item");

// Get all items
exports.index = (req, res) => {
    res.send("All items");
}

// New item form
exports.new = (req, res) => {
    res.send("New item form");
}

// Create new item
exports.create = (req, res) => {
    res.send("Create new item");
}

// Show item by id
exports.show = (req, res) => {
    res.send("Show item by id");
}

// Edit item by id
exports.edit = (req, res) => {
    res.send("Edit item by id");
}

// Update item by id
exports.update = (req, res) => {
    res.send("Update item by id");
}

// Delete item by id
exports.delete = (req, res) => {
    res.send("Delete item by id");
}