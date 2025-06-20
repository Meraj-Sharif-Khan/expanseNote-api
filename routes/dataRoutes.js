const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const auth = require("../middleware/auth");

router.post("/", auth, dataController.createData);
router.get("/", auth, dataController.getAllData);
router.put("/:id", auth, dataController.updateData);
router.delete("/:id", auth, dataController.deleteData);

module.exports = router;
