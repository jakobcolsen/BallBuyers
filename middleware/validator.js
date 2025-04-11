exports.validateId = (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
        err.status = 400;
        next(err);
        return;
    }

    next();
}