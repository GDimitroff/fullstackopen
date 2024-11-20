const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('5')
})

app.listen(PORT, () => {
  // eslint-disable-next-line
  this_causes_error
  console.log(`server started on port ${PORT}`)
})
