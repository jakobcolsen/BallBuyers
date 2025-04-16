const express = require("express");
const controller = require("../controllers/userController");
const { validateEmail } = require("../middleware/validator");
const router = express.Router();

router.get("/login", controller.login);
router.post("/login", validateEmail, controller.authenticate);

router.get("/signup", controller.signup);
router.post("/signup", validateEmail, controller.register);

router.get("/profile", controller.profile);

router.get("/logout", controller.logout);

module.exports = router;