const express = require('express')
const shiftsRouter = require('./routes/shifts')
const facilitiesRouter = require('./routes/facilities')
const nursesRouter = require('./routes/nurse')

const router = express.Router()

router.use('/api', shiftsRouter)
router.use('/api', facilitiesRouter)
router.use('/api', nursesRouter)

module.exports = router