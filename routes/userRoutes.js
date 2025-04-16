const express = require("express");
const controller = require("../controllers/userController");
const { validateEmail } = require("../middleware/validator");
const { isGuest, isLoggedIn } = require("../middleware/auth");
const router = express.Router();

router.get("/login", isGuest, controller.login);
router.post("/login", isGuest, validateEmail, controller.authenticate);

router.get("/signup", isGuest, controller.signup);
router.post("/signup", isGuest, validateEmail, controller.register);

router.get("/profile", isLoggedIn, controller.profile);

router.get("/logout", isLoggedIn, controller.logout);

module.exports = router;