const express = require('express')
const NurseController = require('../controllers/nurse')

const router = express.Router()

router.get('/nurse-jobs-availability', NurseController.getJobsAvailability)
router.get('/nurse-coworkers', NurseController.getCoworkers)

module.exports = router