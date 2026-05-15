const service = require("../services/usersService");

exports.getAllUsers = async (req, res, next) => {
  try {
    res.json(await service.getAllUsers());
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    res.json(await service.getUserById(req.params.id));
  } catch (err) {
    console.log(err);
  }
};
