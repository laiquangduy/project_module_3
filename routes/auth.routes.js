const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

//define router
// "/register" --> sử dụng user.controller createUser
router.get("/register", authController.renderRegister);
router.post("/register", userController.createOne);
router.get("/login", authController.renderLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
