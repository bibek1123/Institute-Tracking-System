const express = require('express')
const router = express.Router()
router.use('/api/instructor', require('./instructor'))
router.use('/checkin', require('./checkIn'))
router.use('/checkout', require('./checkOut'))
router.use('/monthlyreport', require('./monthlyReport'));

module.exports = router