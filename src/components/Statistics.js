router.get('/statistics/:month', async (req, res) => {
  try {
    const {month} = req.params
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {dateOfSale: {$regex: new RegExp(month, 'i')}},
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: {$sum: '$price'},
          totalSoldItems: {$sum: 1},
        },
      },
    ])
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: {$regex: new RegExp(month, 'i')},
      isSold: false,
    })
    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalSaleAmount || 0,
      totalSoldItems: totalSaleAmount[0]?.totalSoldItems || 0,
      totalNotSoldItems: totalNotSoldItems || 0,
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({message: 'Internal server error.'})
  }
})

module.exports = router
