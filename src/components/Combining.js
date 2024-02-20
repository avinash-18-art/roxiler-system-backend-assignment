const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const initializeDatabaseRouter = require('./routes/initializeDatabase')
const transactionsRouter = require('./routes/transactions')
const statisticsRouter = require('./routes/statistics')
const barChartRouter = require('./routes/barChart')
const pieChartRouter = require('./routes/pieChart')

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))

// Routes
app.use('/api', initializeDatabaseRouter)
app.use('/api', transactionsRouter)
app.use('/api', statisticsRouter)
app.use('/api', barChartRouter)
app.use('/api', pieChartRouter)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
