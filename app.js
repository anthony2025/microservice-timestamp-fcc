'use strict'
// I can pass a string as a parameter, and it will check to see whether that string contains either
// a unix timestamp or a natural language date (example: January 1, 20)
// If it does, it returns both the Unix timestamp and the natural language form of that date.
// If it does not contain a date or Unix timestamp, it returns null for those properties.

// setting up express
const express = require('express')
const app = express()

// setting up environment variables
const PORT = process.env.PORT || 4000

// setting up the express router
const router = require('./router.js')
app.use('/*', router)

// setting up a homepage
app.get('/', express.static('index.html'))

// setting up the express server
app.listen(PORT, () => console.log('App running on port: ' + PORT))
