const service = require("../services/transactionsService");

exports.getAllTransactions = async (req, res, next) => {
  try {
    res.json(await service.getAllTransactions());
  } catch (err) {
    console.log(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    res.json(await service.getTransactionById(req.params.id));
  } catch (err) {
    console.log(err);
  }
};

exports.updateTransactionById = async (req, res, next) => {
  try {
    res.json(await service.updateTransactionById(req.params.id, req.body));
  } catch (err) {
    console.log(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    res.status(201).json(await service.createTransaction(req.body));
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTransactionById = async (req, res, next) => {
  try {
    await service.deleteTransactionById(req.params.id);
    res.json({
      message: "Deleted"
    });
  } catch (err) {
    console.log(err);
  }
};


exports.deleteAllTransactions = async (req, res, next) => {
  try {
    res.status(201).json(await service.deleteAllTransactions());

  } catch (err) {
    console.log(err);
  }
};