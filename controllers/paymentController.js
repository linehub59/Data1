const service = require("../services/paymentService");


exports.stkpush = async (req, res, next) => {
  try {
    res.json(await service.stkpush(req.body));
  } catch (err) {
    console.log(err);
  }
};

exports.callback = async (req, res, next) => {
  try {
    res.json(await service.callback(req.body));
  } catch (err) {
    console.log(err);
  }
};