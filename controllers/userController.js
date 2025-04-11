const model = require("../models/user");

exports.login = (req, res) => {
    res.render("users/login");
}

exports.authenticate = (req, res, next) => {
    model.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            let err = new Error("Invalid email or password.");
            err.status = 401;
            next(err);
            return;
        }

        user.comparePassword(req.body.password)
        .then(isMatch => {
            if (!isMatch) {
                let err = new Error("Invalid email or password.");
                err.status = 401;
                next(err);
                return;
            }

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

    user.save()
    .then(() => { res.redirect("/user/login") })
    .catch(err => {
        if (err.name === "ValidationError") {
            err.status = 400;
        }

        if (err.code === 11000) {
            err.status = 409;
            err.message = "Email already exists.";
        }

        next(err);
    });
}

exports.profile = (req, res) => { 
    res.render("users/profile");
}

exports.logout = (req, res) => {
    // sessions not implemented yet
}