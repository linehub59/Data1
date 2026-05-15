const service = require("../services/dataService");

exports.getAllData = async (req, res, next) => {
  try {
    res.json(await service.getAllData());
  } catch (err) {
    console.log(err);
  }
};

exports.getDataById = async (req, res, next) => {
  try {
    res.json(await service.getDataById(req.params.id));
  } catch (err) {
    console.log(err);
  }
};

exports.updateDataById = async (req, res, next) => {
  try {
    res.json(await service.updateDataById(req.params.id, req.body));
  } catch (err) {
    console.log(err);
  }
};

exports.createData = async (req, res, next) => {
  try {
    res.status(201).json(await service.createData(req.body));
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDataById = async (req, res, next) => {
  try {
    await service.deleteDataById(req.params.id);
    res.json({
      message: "Deleted"
    });
  } catch (err) {
    console.log(err);
  }
};


exports.deleteAllData = async (req, res, next) => {
  try {
    res.status(201).json(await service.deleteAllData());

  } catch (err) {
    console.log(err);
  }
};