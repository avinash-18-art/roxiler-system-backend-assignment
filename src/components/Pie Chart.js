router.get('/pie-chart/:month', async (req, res) => {
  try {
    const {month} = req.params
    const pieChartData = await Transaction.aggregate([
      {
        $match: {dateOfSale: {$regex: new RegExp(month, 'i')}},
      },
      {
        $group: {
          _id: '$category',
          count: {$sum: 1},
        },
      },
    ])
    res.status(200).json(pieChartData)
  } catch (error) {
    console.error('Error fetching pie chart data:', error)
    res.status(500).json({message: 'Internal server error.'})
  }
})

module.exports = router
