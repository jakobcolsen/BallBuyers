const { v4: uuidv4 } = require("uuid");

const items = [
    {
        id: "1",
        title: "Willie Mays 1938 Signed Baseball",
        seller: "Rick May",
        condition: "Great",
        price: 1200.00,
        details: "Authenticated 1938 baseball signed by Willie Mays! Kept in great condition, no restoration work has been done to the ball.",
        image: "../public/images/BB_WillieMays.jpeg",
        active: true
    },
    {
        id: "2",
        title: "1999 NYY Team Signed Baseball",
        seller: "Cave Johnson",
        condition: "Good",
        price: 1535.00,
        details: "1999 NYY Team Signed Baseball. Authenticated.",
        images: "../public/images/bb-nyy-team-1999.jpg",
        active: true
    },
    {
        id: "3",
        title: "Authentic! Daniel Norris Signed Baseball",
        seller: "Gordon Freeman",
        condition: "Perfect",
        price: 987.99,
        details: "Authentic Daniel Norris signed baseball. Kept in perfect condition.",
        images: "../public/images/bb-danielnorris.jpg",
        active: true
    },
    {
        id: "4",
        title: "Mickey Mantle Autographed Baseball",
        seller: "Dell Conagher",
        condition: "Great",
        price: "780.00",
        details: "Mickey Mantle autographed baseball. Authenticated.",
        images: "../public/images/bb-mickeymantle.jpg",
        active: true
    },
    {
        id: "5",
        title: "Pete Rose \"I'm Sorry I Bet on Baseball\" Autographed Baseball",
        seller: "Tavish DeGroot",
        condition: "Perfect",
        price: 1800.00,
        details: "Pete Rose \"I'm Sorry I Bet on Baseball\" Autographed Baseball. Authenticated.",
        images: "../public/images/bb-peterose.jpg",
        active: true
    },
    {
        id: "6",
        title: "Hank Aaron Signed Baseball",
        seller: "Ludwig Humboldt",
        condition: "Fair",
        price: 610.00,
        details: "Hank Aaron signed baseball. Authenticated.",
        images: "../public/images/bb-hankaaron.jpg",
        active: true
    }
];

// Get all items
exports.findAll = () => {
    return items;
}

// Get item by id
exports.findById = (id) => {
    return items.find(item => item.id === id);
}

// Create new item
exports.create = (item) => {
    item.id = uuidv4();
    items.push(item);
}

// Update by id
exports.updateById = (id, updatedItem) => {
    const item = items.find(item => item.id === id);
    if (!item) return false;

    item.title = updatedItem.title;
    item.condition = updatedItem.condition;
    item.price = updatedItem.price;
    item.details = updatedItem.details;
    item.image = updatedItem.image;
    return true;
}

// Delete by id
exports.deleteById = (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    return true;
}