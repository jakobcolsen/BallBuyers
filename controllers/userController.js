const model = require("../models/user");
const Item = require("../models/item");
const Offer = require("../models/offer");

exports.login = (req, res) => {
    res.render("users/login");
}

exports.authenticate = (req, res, next) => {
    model.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            req.flash("error", "Invalid email or password.");
            res.redirect("/user/login");
        }

        user.comparePassword(req.body.password)
        .then(isMatch => {
            if (!isMatch) {
                req.flash("error", "Invalid email or password."); // Good practice to not specify which one is wrong... or so I'm told
                res.redirect("/user/login");
                return;
            }

            req.session.user = user._id;
            req.flash("success", "You are now logged in.");
            res.redirect("/user/profile");
        })
        .catch(err => { next(err) });
    })
}

exports.signup = (req, res) => {
    res.render("users/new");
}

exports.register = (req, res) => {
    let user = new model(req.body);

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect("/user/signup");
    }

    user.save()
    .then(() => { res.redirect("/user/login") })
    .catch(err => {
        if (err.name === "ValidationError") {
            req.flash("error", err.message);
            return res.redirect("/user/signup");
        }

        if (err.code === 11000) {
            req.flash("error", "Email already exists.");
            return res.redirect("/user/signup");
        }

        next(err);
    });
}

exports.profile = (req, res) => { 
    if (!req.session.user) {
        req.flash("error", "You must be logged in to view this page.");
        return res.redirect("/user/login");
    }

    Promise.all([model.findById(req.session.user), Item.find({seller: req.session.user}), Offer.find({buyer: req.session.user})])
    .then(results => {
        const [user, items, offers] = results;
        if (offers.length > 0) {
            offers.forEach(offer => {
                offer.populate("item", "image title condition price offers")
                .then(offer => { return offer })
                .catch(err => { next(err) });
            })
        }

        res.render("users/profile", {user, items, offers});
    })
    .catch(err => { next(err) });
}

exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}