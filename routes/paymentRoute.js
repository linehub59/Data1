const router = require("express").Router();
const ctrl = require("../controllers/paymentController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);

router.post("/stkpush", role(["admin"]), ctrl.stkpush);
router.post("/callback", role(["admin"]), ctrl.callback);


module.exports = router;