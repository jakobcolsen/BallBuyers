const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {type: String, required: [true, "Title is required"]},
    seller: {type: Schema.Types.ObjectId, ref: "User", required: [true, "Seller is required"]},
    condition: {type: String, enum: ["Perfect", "Great", "Good", "Fair", "Bad"], required: [true, "Condition is required"]},
    price: {type: Number, required: [true, "Price is required"]},
    details: {type: String, required: [true, "Details are required"]},
    image: {type: String, required: [true, "Image is required"]},
    offers: [{type: Schema.Types.ObjectId, ref: "Offer"}], // Array of offer IDs
    active: {type: Boolean, default: true}
}, {timestamps: true});

module.exports = mongoose.model("Item", itemSchema);