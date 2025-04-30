const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId, ref: "User", required: [true, "Buyer is required"]},
    item: {type: Schema.Types.ObjectId, ref: "Item", required: [true, "Item is required"]},
    amount: {type: Number, required: [true, "Amount is required"], min: [0.01, "Amount must be greater than 0"]},
    status: {type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending"},  
});

module.exports = mongoose.model("Offer", offerSchema);