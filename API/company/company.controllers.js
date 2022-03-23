const Company = require("../../models/Company");
const User = require("../../models/User");

// exports.fetchCompany = async (userId, next) => {
//   try {
//     const Company = await company.findById(jobSeekerId);
//     return Company;
//   } catch (error) {
//     next(error);
//   }
// };

exports.fetchCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    return res.json(companies);
  } catch (error) {
    next(error);
  }
};

exports.createCompany = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    //   req.body.image = req.body.image.replace("\\", "/");
    // }
    //*create new company:
    req.body.user = req.user._id;
    console.log(req.body, "Hassan testing");
    const newCompany = await Company.create(req.body);
    console.log(req.user, "hhhebfdjr");
    return res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};

// exports.updateCompany = async (req, res, next) => {
//   try {
//     const companyId = req.company._id;
//     const updateCompany = await Profile.findByIdAndUpdate(req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json(updateC);
//   } catch (error) {
//     next(error);
//   }
// };
