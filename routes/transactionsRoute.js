const router = require("express").Router();
const ctrl = require("../controllers/transactionsController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);

router.post("/", role(["admin"]), ctrl.createTransaction);
router.get("/", role(["admin"]), ctrl.getAllTransactions);
router.get("/:id", role(["admin"]), ctrl.getTransactionById);
router.put("/:id", role(["admin"]), ctrl.updateTransactionById);
router.delete("/", role(["admin"]), ctrl.deleteAllTransactions);
router.delete("/:id", role(["admin"]), ctrl.deleteTransactionById);

module.exports = router;