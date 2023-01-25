const express = require('express')
const FacilitiesController = require('../controllers/facilities')

const router = express.Router()

router.get('/remaining-spots', FacilitiesController.getRemainingSpots)

module.exports = router