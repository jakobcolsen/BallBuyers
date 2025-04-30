const model = require("../models/offer");
const User = require("../models/user");
const Item = require("../models/item");

exports.create = (req, res, next) => {
    let offer = new model(req.body);
    offer.buyer = req.session.user;
    offer.item = req.params.id;

    Item.findById(req.params.id)
    .then(item => {
        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        item.offers.push(offer._id);
        if (item.highestOffer < offer.amount) {
            item.highestOffer = offer.amount;
        }

        item.save()
        .then(() => {
            return;
        })
    })
    .catch(err => next(err));

    offer.save()
    .then(() => {
        req.flash("success", "Offer made successfully.");
        res.redirect("/items/" + req.params.id) 
    })
    .catch(err => { 
        if (err.name === "ValidationError") {
            err.status = 400;
        }

        next(err);
     });
}

exports.index = (req, res, next) => {
    Promise.all([model.find({ item: req.params.id }).populate("buyer", "firstName lastName"), Item.findById(req.params.id).populate("seller", "firstName lastName")])
    .then(results => {
        const [offers, item] = results;
        res.render("items/offers/index", { offers, item })
    })
    .catch(err => next(err));
}

exports.update = (req, res, next) => {
    model.findByIdAndUpdate(req.params.offer_id, req.body, { new: true, runValidators: true })
    .then(offer => {
        if (!offer) {
            let err = new Error(`The requested offer with id of ${req.params.offer_id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        req.flash("success", "Offer updated successfully.");
        res.redirect(`/items/${req.params.id}/`) 
    })
    .catch(err => { 
        if (err.name === "ValidationError") {
            err.status = 400;
        }

        next(err);
     });

    Item.findById(req.params.id)
    .then(item => {
        if (!item) {
            let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        // Calculate the highest offer amount
        item.populate("offers", "amount")
        .then(item => {
            let highestOffer = item.offers[0].amount;
            item.offers.forEach(offer => {
                if (offer.amount > highestOffer) {
                    highestOffer = offer.amount;
                }
            });

            item.highestOffer = highestOffer;
            
            item.save()
            .then(() => {
                return;
            })
        })
        .catch(err => { next(err) });
    })
    .catch(err => { next(err) });
}

exports.delete = (req, res, next) => {
    model.findByIdAndDelete(req.params.offer_id)
    .then(offer => {
        if (!offer) {
            let err = new Error(`The requested offer with id of ${req.params.offer_id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        Item.findById(req.params.id)
        .then(item => {
            if (!item) {
                let err = new Error(`The requested item with id of ${req.params.id} could not be found.`);
                err.status = 404;
                next(err);
                return;
            }

            item.offers.pull(offer._id);

            // Calculate the highest offer amount
            item.populate("offers", "amount")
            .then(item => {
                if (item.offers.length === 0) {
                    item.highestOffer = 0;
                } else {
                    let highestOffer = item.offers[0].amount;
                    item.offers.forEach(offer => {
                        if (offer.amount > highestOffer) {
                            highestOffer = offer.amount;
                        }
                    });

                    item.highestOffer = highestOffer;
                }

                item.save()
                .then(() => {
                    req.flash("success", "Offer deleted successfully.");
                    res.redirect(`/items/${req.params.id}`) 
                })
                .catch(err => { next(err) });
            })
            .catch(err => { next(err) });
        })
        .catch(err => { next(err) });
    })
    .catch(err => { next(err) });
}

exports.accept = (req, res, next) => {
    Promise.all([model.findById(req.params.offer_id), Item.findById(req.params.id).populate("offers", "status _id")])
    .then(results => {
        const [offer, item] = results;
        if (!offer || !item) {
            let err = new Error(`The requested offer with id of ${req.params.offer_id} or item with id of ${req.params.id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        offer.status = "Accepted";
        item.active = false;

        item.offers.forEach(offer => {
            if (offer._id != req.params.offer_id) {
                offer.status = "Rejected";
                offer.save()
                .then(() => {
                    return;
                })
            }
        });
        
        Promise.all([offer.save(), item.save()])
        .then(() => {
            req.flash("success", "Offer accepted successfully.");
            res.redirect(`/items/${req.params.id}/offers`) 
        })
        .catch(err => { next(err) });
    })
    .catch(err => { next(err) });
}

exports.reject = (req, res, next) => {
    model.findById(req.params.offer_id)
    .then(offer => {
        if (!offer) {
            let err = new Error(`The requested offer with id of ${req.params.offer_id} could not be found.`);
            err.status = 404;
            next(err);
            return;
        }

        offer.status = "Rejected";
        offer.save()
        .then(() => {
            req.flash("success", "Offer rejected successfully.");
            res.redirect(`/items/${req.params.id}/offers`) 
        })
        .catch(err => { next(err) });
    })
    .catch(err => { next(err) });
}
