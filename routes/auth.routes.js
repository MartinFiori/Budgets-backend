const router = require("express").Router();
const AuthController = require("../controllers/auth.controller.js");
const isAuth = require("../middlewares/isAuth.js");

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.logIn);
router.post("/logout", AuthController.logout);
router.post("/verifyUser", isAuth, AuthController.verifyUser);

module.exports = router;
