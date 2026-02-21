const ApplicationModel = require('../models/Application');
const { HTTP_STATUS } = require('../config/constants');

const getAllApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const applications = await ApplicationModel.getApplicationsForUser(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

const getApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const application = await ApplicationModel.getApplicationById(id, userId);
    if (!application) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const appData = req.body;

    const application = await ApplicationModel.createApplication(userId, appData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Application created successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const appData = req.body;

    const application = await ApplicationModel.updateApplication(id, userId, appData);
    if (!application) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Application updated successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await ApplicationModel.deleteApplication(id, userId);
    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
