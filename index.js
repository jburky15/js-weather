const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // Amount of time allowing set amount of requests (10 Minutes)
    max: 5                    // Number of requests allowed
})

app.use(limiter)
app.set('trust proxy', 1)

// Set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'))

// Enable CORS
app.use(cors())

// Let's us know the server is up and running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))