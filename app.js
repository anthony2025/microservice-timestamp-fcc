const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

app.get('/:date'), (req, res) => {
    const date = req.params.date
    console.log(date)
}

app.get('/', express.static('public'))

app.listen(PORT, () => console.log('App running on port: ' + PORT))

const isValidTimestamp = (date) => {
  return Number.isInteger(date) && date >= 0;
}
