const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { type, category, division, startDate, endDate } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (division) filter.division = division;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await Transaction.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    const diffHours =
      (Date.now() - new Date(transaction.createdAt)) / (1000 * 60 * 60);

    if (diffHours > 12) {
      return res.status(403).json({ message: "Edit time expired" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
