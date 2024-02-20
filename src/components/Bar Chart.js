router.get('/bar-chart/:month', async (req, res) => {
  try {
    const {month} = req.params
    const barChartData = await Transaction.aggregate([
      {
        $match: {dateOfSale: {$regex: new RegExp(month, 'i')}},
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {case: {$lte: ['$price', 100]}, then: '0-100'},
                {case: {$lte: ['$price', 200]}, then: '101-200'},
                {case: {$lte: ['$price', 300]}, then: '201-300'},
                {case: {$lte: ['$price', 400]}, then: '301-400'},
                {case: {$lte: ['$price', 500]}, then: '401-500'},
                {case: {$lte: ['$price', 600]}, then: '501-600'},
                {case: {$lte: ['$price', 700]}, then: '601-700'},
                {case: {$lte: ['$price', 800]}, then: '701-800'},
                {case: {$lte: ['$price', 900]}, then: '801-900'},
              ],
              default: '901-above',
            },
          },
          count: {$sum: 1},
        },
      },
    ])
    res.status(200).json(barChartData)
  } catch (error) {
    console.error('Error fetching bar chart data:', error)
    res.status(500).json({message: 'Internal server error.'})
  }
})

module.exports = router
