const express = require('express')
const router = express.Router()
const axios = require('axios')
const Transaction = require('../models/Transaction')

router.post('/initialize-database', async (req, res) => {
  try {
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json',
    )
    const transactions = response.data
    await Transaction.insertMany(transactions)
    res.status(200).json({message: 'Database initialized successfully.'})
  } catch (error) {
    console.error('Error initializing database:', error)
    res.status(500).json({message: 'Internal server error.'})
  }
})

module.exports = router
