const service = require("../services/profileService");


exports.getProfile = async (req, res, next) => {
  try {
    res.json(await service.getProfile(req.user.uid));
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    await service.updateProfile(req.params.id, req.body);
    res.json({
      message: "Updated"
    });
  } catch (err) {
    next(err);
  }
};

