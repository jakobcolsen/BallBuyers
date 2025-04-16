const Item = require("../models/item");

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    req.flash("error", "You are already logged in");
    res.redirect("/user/profile");
}

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.flash("error", "You must be logged in to access this page");
    res.redirect("/user/login");
}

exports.isSeller = (req, res, next) => {
    Item.findById(req.params.id)
    .then(item => {
        if (item) {
            if (item.seller == req.session.user) {
                return next();
            } else {
                req.flash("error", "You are not authorized to access this page");
                res.redirect("back");
            }
        } else {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }
    })
    .catch(err => { next(err) });
}