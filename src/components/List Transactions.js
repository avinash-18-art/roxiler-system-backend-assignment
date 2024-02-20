router.get('/transactions', async (req, res) => {
  try {
    const {page = 1, perPage = 10, search = ''} = req.query
    const regex = new RegExp(search, 'i')
    const transactions = await Transaction.find({
      $or: [{title: regex}, {description: regex}, {price: regex}],
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
    res.status(200).json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({message: 'Internal server error.'})
  }
})

module.exports = router
