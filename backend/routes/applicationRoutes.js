const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', applicationController.getAllApplications);
router.post('/', applicationController.createApplication);
router.get('/:id', applicationController.getApplication);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
