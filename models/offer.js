const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId, ref: "User", required: [true, "Buyer is required"]},
    item: {type: Schema.Types.ObjectId, ref: "Item", required: [true, "Item is required"]},
    price: {type: Number, required: [true, "Price is required"]},
    status: {type: String, enum: ["Pending", "Accepted", "Rejected"], default: "pending"},
    message: {type: String, required: [true, "Message is required"]},    
});

module.exports = mongoose.model("Offer", offerSchema);