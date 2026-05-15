const router = require("express").Router();
const ctrl = require("../controllers/dashboardController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);


router.get("/", role(["admin"]), ctrl.getDashboard);

module.exports = router;