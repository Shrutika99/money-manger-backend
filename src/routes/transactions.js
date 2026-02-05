const express = require("express");
const {
  addTransaction,
  getTransactions,
  editTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", editTransaction);

module.exports = router;
