const JobSeeker = require("../../models/JobSeeker");

exports.fetchJobSeeker = async (userId, next) => {
  try {
    const jobSeeker = await jobSeeker.findById(jobSeekerId);
    return jobSeeker;
  } catch (error) {
    next(error);
  }
};

exports.fetchJobSeekers = async (req, res, next) => {
  try {
    const jobSeekers = await JobSeeker.find();
    return res.json(jobSeekers);
  } catch (error) {
    next(error);
  }
};
exports.deleteJobSeeker = async (req, res, next) => {
  try {
    await req.jobSeeker.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
  exports.createJobSeeker = async (req, res, next) => {
    try {
      console.log(req.body.image);
      if (req.file) {
        req.body.image = `/${req.file.path}`;
        req.body.image = req.body.image.replace("\\", "/");
      }
      const { userId } = req.params;
      req.body.user = userId;
      console.log(req.body);
      const newJobSeeker = await JobSeeker.create(req.body);
      await JobSeekers.findOneAndUpdate(
        { _id: userId },
        { $push: { jobSeeker: newJobSeeker._id } }
      );
      return res.status(201).json(newJobSeeker);
    } catch (error) {}
  };

  exports.updatejobSeeker = async (req, res, next) => {
    try {
      const jobSeekerId = req.jobSeeker._id;
      const updateJobSeeker = await Profile.findByIdAndUpdate(req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updateJobSeeker);
    } catch (error) {
      next(error);
    }
  };
};
