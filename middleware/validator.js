exports.validateId = (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error(`The requested id of ${req.params.id} is not valid.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}

exports.validateSignup = (req, res, next) => {
    
}

exports.validateLogin = (req, res, next) => {
}

exports.validateItem = (req, res, next) => {
}

exports.validateOffer = (req, res, next) => {
}
