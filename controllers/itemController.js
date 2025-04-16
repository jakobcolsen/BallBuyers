const model = require("../models/item");
const fs = require("fs");
const path = require("path");

// Get all items
exports.index = (req, res, next) => {
    model.find({ active: true })
    .sort({ price: "asc"})
    .then(items => {
        res.render("./items/index", { items: items, title: "Catalog" });
    })
    .catch(err => { next(err)});
}

// New item form
exports.new = (req, res) => {
    res.render("./items/new");
}

// Create new item
exports.create = (req, res, next) => {
    let item = new model(req.body);
    item.seller = req.session.user;

    if (req.file !== undefined) {
        item.image = "/images/uploads/" + req.file.filename;
    }
    
    item.save()
    .then(() => { res.redirect("/items") })
    .catch(err => { 
        if (err.name === "ValidationError") {
            err.status = 400;
        }

        next(err);
     });
}

// Show item by id
exports.show = (req, res, next) => {
    model.findById(req.params.id)
    .then(item => {
        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        item = item.populate("seller", "firstName lastName")
        .then(item => { res.render("./items/item", { item }) })
        .catch(err => { next(err) });
    })
    .catch(err => { next(err) });
}

// Edit item by id
exports.edit = (req, res, next) => {
    model.findById(req.params.id)
    .then(item => {
        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        res.render("./items/edit", { item });
    })
    .catch(err => { next(err) });
}

// Update item by id
exports.update = (req, res, next) => {
    let item = req.body;

    if (req.file !== undefined)  {
        item.image = "/images/uploads/" + req.file.filename;
    }

    model.findByIdAndUpdate(req.params.id, item, { useFindAndModify: false, runValidators: true })
    .then(item => {
        if (req.file !== undefined) {
            // Delete old image from uploads folder
            let imagePath = path.join(__dirname, "..", "public", item.image);
            fs.unlink(imagePath, err => { if (err) { console.log(err) } }); // We don't use next(err) because this has no effect on the user experience
        }

        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        res.redirect(`/items/${req.params.id}`);
    })
    .catch(err => {
        if (err.name === "ValidationError") {
            err.status = 400;
        }

        next(err);
    });
}

// Delete item by id
exports.delete = (req, res, next) => {
    model.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then(item => {
        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        // Delete image from uploads folder
        let imagePath = path.join(__dirname, "..", "public", item.image);
        fs.unlink(imagePath, err => { if (err) { console.log(err) } });

        res.redirect("/items");
    })
    .catch(err => { next(err) });
}

// Search by keywords (in any order)
exports.search = (req, res, next) => {
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

    let items = model.find({ active: true })
    .then(items => {
        items = items.filter(item => {
            let tempItem = { ...item.toObject() }; // Clone item object to avoid modifying the original (learned that the hard way) 
            delete tempItem["_id"];
            delete tempItem["offers"];
            delete tempItem["active"];
            delete tempItem["image"];
            delete tempItem["seller"];
            delete tempItem["__v"];
            delete tempItem["createdAt"];
            delete tempItem["updatedAt"];
            console.log(tempItem);
    
            let itemString = Object.values(tempItem).join(" ").toLowerCase();
            return keywords.every(keyword => itemString.includes(keyword));
        });
    
        let titleKeywords = (req.query.keywords.length > 20) ? req.query.keywords.substring(0, 20) + "..." : req.query.keywords;
        const title = `Search results for "${titleKeywords}"`;
        res.render("./items/index", { items, title });
    })
    .catch(err => { next(err) });
}