const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const itemRouter = require("./routes/itemRoutes");

const app = express();
let port = 3000;
let hostname = "localhost";
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.use("/items", itemRouter);

// Start server
app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});