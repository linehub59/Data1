const router = require("express").Router();
const ctrl = require("../controllers/usersController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);

router.get("/", role(["admin"]), ctrl.getAllUsers);
router.get("/:id", role(["admin"]), ctrl.getUserById);

module.exports = router;