exports.validateId = (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error(`The requested id of ${req.params.id} is not valid.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}

// Needed this for 4155 capstone, figured it can't hurt here
// https://www.regular-expressions.info/email.html
exports.validateEmail = (req, res, next) => {
    if (!req.body.email) {
        let err = new Error("Email is required.");
        err.status = 400;
        next(err);
        return;
    }

    if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        let err = new Error(`${req.body.email} is not a valid email.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}