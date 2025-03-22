const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const itemRouter = require("./routes/itemRoutes");

const app = express();
let port = 3000;
let hostname = "localhost";
app.set("view engine", "ejs");

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => { console.log(err) });

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

app.use((req, res, next) => {
  let err = new Error(`The requested URL ${req.url} could not be found.`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status !== 404) { // 404 is usually a user error, will spam console in a production env
    console.log(err.stack)
  }; 

  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  res.status(err.status);
  res.render("error", { error: err});
});