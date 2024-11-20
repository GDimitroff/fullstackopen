const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('3')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
