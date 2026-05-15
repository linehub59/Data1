const router = require("express").Router();
const ctrl = require("../controllers/dataController");
const {
  protect
} = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");



router.use(protect);

router.post("/", role(["admin"]), ctrl.createData);
router.get("/", role(["admin"]), ctrl.getAllData);
router.get("/:id", role(["admin"]), ctrl.getDataById);
router.put("/:id", role(["admin"]), ctrl.updateDataById);
router.delete("/", role(["admin"]), ctrl.deleteAllData);
router.delete("/:id", role(["admin"]), ctrl.deleteDataById);

module.exports = router;