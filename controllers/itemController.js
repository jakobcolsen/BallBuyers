const model = require("../models/item");

// Get all items
exports.index = (req, res) => {
    let items = model.findAllActive();
    res.render("./items/index", { items });
}

// New item form
exports.new = (req, res) => {
    res.render("./items/new");
}

// Create new item
exports.create = (req, res) => {
    let item = req.body;
    item.image = "/images/uploads/" + req.file.filename;
    item = model.create(item);
    res.redirect("/items");
}

// Show item by id
exports.show = (req, res) => {
    let item = model.findById(req.params.id);
    if (!item) {
        res.send("404"); //TODO err
        return;
    }
    res.render("./items/item", { item });
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