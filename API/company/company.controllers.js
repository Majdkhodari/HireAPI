const Company = require("../../models/Company");

exports.fetchCompany = async (userId, next) => {
  try {
    const Company = await company.findById(jobSeekerId);
    return Company;
  } catch (error) {
    next(error);
  }
};

exports.fetchCompanies = async (req, res, next) => {
  try {
    const companies = await company.find();
    return res.json(companies);
  } catch (error) {
    next(error);
  }
};
exports.deleteCompany = async (req, res, next) => {
  try {
    await req.company.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
  exports.createCompany = async (req, res, next) => {
    try {
      console.log(req.body.image);
      if (req.file) {
        req.body.image = `/${req.file.path}`;
        req.body.image = req.body.image.replace("\\", "/");
      }
      const { userId } = req.params;
      req.body.user = userId;
      console.log(req.body);
      const newCompany = await Company.create(req.body);
      await Company.findOneAndUpdate(
        { _id: userId },
        { $push: { company: newCompany._id } }
      );
      return res.status(201).json(newCompany);
    } catch (error) {}
  };

  exports.updateCompany = async (req, res, next) => {
    try {
      const companyId = req.company._id;
      const updateCompany = await Profile.findByIdAndUpdate(req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updateC);
    } catch (error) {
      next(error);
    }
  };
};
