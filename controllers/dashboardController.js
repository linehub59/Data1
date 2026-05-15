const service = require("../services/dashboardService");

exports.getDashboard = async (req, res, next) => {
  try {
    res.json(await service.getDashboard());
  } catch (err) {
    console.log(err);
  }
};