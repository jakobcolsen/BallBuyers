const express = require("express");
const morgan = require("morgan");

const app = express();
let port = 3000;
let hostname = "localhost";
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});
