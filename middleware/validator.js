const { check, body, validationResult } = require("express-validator");

exports.validateId = (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error(`The requested id of ${req.params.id} is not valid.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}

exports.validateOfferId = (req, res, next) => {
    if (!req.params.offer_id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error(`The requested offer id of ${req.params.offer_id} is not valid.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}

exports.validateSignup = [
    body("firstName", "First name cannot be empty.").notEmpty().trim().escape(),
    body("lastName", "Last name cannot be empty.").notEmpty().trim().escape(),
    body("email", "You must have a valid email address.").notEmpty().isEmail().trim().escape().normalizeEmail(),
    body("password", "Password must be between 8 and 64 characters.").notEmpty().isLength({ min: 8, max: 64 }),
    body("confirmPassword")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password.");
        }
        return true;
    })
]

exports.validateLogin = [
    body("email", "You must have a valid email address.").notEmpty().isEmail().trim().escape(),
    body("password", "Password must be between 8 and 64 characters.").notEmpty().isLength({ min: 8, max: 64 })
]


exports.validateItem = [
    body("title", "Title cannot be empty.").notEmpty().trim().escape(),
    body("condition", "Condition must be one of the following: Perfect, Great, Good, Fair, Bad.").notEmpty().trim().escape().isIn(["Perfect", "Great", "Good", "Fair", "Bad"]),
    body("price", "Price must be a number greater than 0.").notEmpty().isFloat({ gt: 0 }),
    body("details", "Details cannot be empty.").notEmpty().trim().escape(),
    body("image")
    .custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image is required.");
        }
        return true;
    })
]

exports.validateEditItem = [
    body("title", "Title cannot be empty.").notEmpty().trim().escape(),
    body("condition", "Condition must be one of the following: Perfect, Great, Good, Fair, Bad.").notEmpty().trim().escape().isIn(["Perfect", "Great", "Good", "Fair", "Bad"]),
    body("price", "Price must be a number greater than 0.").notEmpty().isFloat({ gt: 0 }),
    body("details", "Details cannot be empty.").notEmpty().trim().escape()
]

exports.validateOffer = [
    body("amount", "Offer amount must be a number greater than 0.").notEmpty().isFloat({ gt: 0 })
]

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err => {
            req.flash('error', err.msg);
        });

        return res.redirect('back');
    } else {
        return next();
    }
}
