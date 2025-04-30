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
            return res.redirect("/users/login");
        }

        user.comparePassword(req.body.password)
        .then(isMatch => {
            if (!isMatch) {
                req.flash("error", "Invalid email or password."); // Good practice to not specify which one is wrong... or so I'm told
                res.redirect("/users/login");
                return;
            }

            req.session.user = user._id;
            req.flash("success", "You are now logged in.");
            res.redirect("/users/profile");
        })
        .catch(err => { next(err) });
    })
}

exports.signup = (req, res) => {
    res.render("./users/new");
}

exports.register = (req, res, next) => {
    let user = new model(req.body);

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect("/users/new");
    }

    user.save()
    .then(item => { 
        req.flash("success", "You are now registered and can log in.");
        res.redirect("/users/login") 
    })
    .catch(err => {
        if (err.name === "ValidationError") {
            req.flash("error", err.message);
            return res.redirect("/users/new");
        }

        if (err.code === 11000) {
            req.flash("error", "Email already exists.");
            console.log(err);
            return res.redirect("/users/new");
        }

        next(err);
    });
}

exports.profile = (req, res) => { 
    if (!req.session.user) {
        req.flash("error", "You must be logged in to view this page.");
        return res.redirect("/users/login");
    }

    Promise.all([model.findById(req.session.user), Item.find({seller: req.session.user}), Offer.find({buyer: req.session.user}).populate("item", "image title condition price offers _id")])
    .then(results => {
        const [user, items, offers] = results;
        res.render("users/profile", {user, items, offers});
    })
    .catch(err => { next(err) });
}

exports.logout = (req, res, next) => {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}