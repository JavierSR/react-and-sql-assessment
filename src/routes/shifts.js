const express = require('express')
const ShiftsController = require('../controllers/shifts')

const router = express.Router()

router.get('/shifts', ShiftsController.getAll)
router.get('/shifts-exceeds-overlap-threshold', ShiftsController.exceedsOverlapThreshold)

module.exports = router