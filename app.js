// Remember that JS processes time in ms and UNIX in sec

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

app.get('/:date', (req, res) => {
    let result = {unix: null, natural: null}

    // If UNIX date is provided
    const numdate = parseInt(req.params.date)
    let objdate = new Date(numdate*1000)
    if (Number.isInteger(numdate) && numdate >= 0) {
      result.unix = numdate
      result.natural = objdate.toDateString()
    }

    // If natural date is provided
    const humandate = req.params.date.replace(/%20/g, " ")
    objdate = new Date(humandate)
    if (!isNaN(Date.parse(humandate))) {
      result.unix = objdate.getTime()/1000
      result.natural = humandate
    }

    res.json(result)
})

app.get('/', express.static('public'))

app.listen(PORT, () => console.log('App running on port: ' + PORT))
