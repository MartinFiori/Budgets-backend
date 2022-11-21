const router = require("express").Router();
const movementController = require("../controllers/movement.controller.js");
const isAuth = require("../middlewares/isAuth.js");

router.post("/create", isAuth, movementController.createMovement);
router.get("/findById/:id", isAuth, movementController.findMovementById);
router.get("/filter/:filter", isAuth, movementController.getMovementByFilter);
router.put("/update/:id", isAuth, movementController.updateMovement);
router.delete("/delete/:id", isAuth, movementController.deleteMovement);
router.get("/getAll", isAuth, movementController.getUserInfo);

module.exports = router;
