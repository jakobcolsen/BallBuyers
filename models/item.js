const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {type: String, required: [true, "Title is required"]},
    seller: {type: String, required: [true, "Seller is required"]},
    condition: {type: String, required: [true, "Condition is required"]},
    price: {type: Number, required: [true, "Price is required"]},
    details: {type: String, required: [true, "Details are required"]},
    image: {type: String, required: [true, "Image is required"]},
    offers: {type: Number, default: 0},
    active: {type: Boolean, default: true}
}, {timestamps: true});

module.exports = mongoose.model("Item", itemSchema);

const items = [
    {
        id: "3",
        title: "Authentic! Daniel Norris Signed Baseball",
        seller: "Gordon Freeman",
        condition: "Perfect",
        price: 987.99,
        details: "Authentic Daniel Norris signed baseball. Kept in perfect condition.",
        image: "/images/uploads/bb-danielnorris.jpg",
        offers: 0,
        active: true
    },
    {
        id: "4",
        title: "Mickey Mantle Autographed Baseball",
        seller: "Dell Conagher",
        condition: "Great",
        price: "780.00",
        details: "Mickey Mantle autographed baseball. Authenticated.",
        image: "/images/uploads/bb-mickeymantle.jpg",
        offers: 0,
        active: true
    },
    {
        id: "5",
        title: "Pete Rose \"I'm Sorry I Bet on Baseball\" Autographed Baseball",
        seller: "Tavish DeGroot",
        condition: "Perfect",
        price: 1800.00,
        details: "Pete Rose \"I'm Sorry I Bet on Baseball\" Autographed Baseball. Authenticated.",
        image: "/images/uploads/bb-peterose.jpg",
        offers: 0,
        active: true
    },
    {
        id: "6",
        title: "Hank Aaron Signed Baseball",
        seller: "Ludwig Humboldt",
        condition: "Fair",
        price: 610.00,
        details: "Hank Aaron signed baseball. Authenticated.",
        image: "/images/uploads/bb-hankaaron.jpg",
        offers: 0,
        active: true
    }
];