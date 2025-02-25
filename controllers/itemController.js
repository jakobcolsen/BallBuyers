const model = require("../models/item");

// Get all items
exports.index = (req, res) => {
    let items = model.findAllActive();
    const title = "Catalog";
    res.render("./items/index", { items, title });
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
exports.show = (req, res, next) => {
    let item = model.findById(req.params.id);

    if (!item) {
       let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
       err.status = 404;
       next(err);
       return;
    }

    res.render("./items/item", { item });
}

// Edit item by id
exports.edit = (req, res, next) => {
    let item = model.findById(req.params.id);

    if (!item) {
        let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
        err.status = 404;
        next(err);
        return;
    }

    res.render("./items/edit", { item })
}

// Update item by id
exports.update = (req, res) => {
    let item = req.body;

    if (req.file !== undefined) item.image = "/images/uploads/" + req.file.filename;
    if (!model.updateById(req.params.id, item)) {
        let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
        err.status = 404;
        next(err);
        return;
    }

    res.redirect(`/items/${req.params.id}`);
}

// Delete item by id
exports.delete = (req, res) => {
    if (!model.deleteById(req.params.id)) {
        let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
        err.status = 404;
        next(err);
        return;
    }

    res.redirect("/items");
}

// Search by keywords (in any order)
exports.search = (req, res) => {
    if (!req.query || !req.query.keywords) {
        res.redirect("/items");
        return;
    }

    let keywords = new Set(req.query.keywords.toLowerCase().split(" ")); 
    keywords = Array.from(keywords); 
    keywords = keywords.filter(keyword => keyword.length > 2);

    if (keywords.length === 0) {
        res.redirect("/items");
        return;
    }

    let items = model.findAllActive();
    items = items.filter(item => {
        let tempItem = { ...item }; // Clone item object to avoid modifying the original (learned that the hard way) 
        delete tempItem["id"];
        delete tempItem["offers"];
        delete tempItem["active"];
        delete tempItem["image"];
        delete tempItem["seller"];

        let itemString = Object.values(tempItem).join(" ").toLowerCase();
        return keywords.every(keyword => itemString.includes(keyword));
    });

    let titleKeywords = (req.query.keywords.length > 20) ? req.query.keywords.substring(0, 20) + "..." : req.query.keywords;
    const title = `Search results for "${titleKeywords}"`;
    res.render("./items/index", { items, title });
}