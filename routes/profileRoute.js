const router = require("express").Router();
const ctrl = require("../controllers/profileController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);

router.get("/", role(["admin"]), ctrl.getProfile);
router.put("/:id", role(["admin"]), ctrl.updateProfile);


module.exports = router;