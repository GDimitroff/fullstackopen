const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('65')
})

app.get('/health', (req, res) => {
  // eslint-disable-next-line no-undef
  throw new Error('oh no')
  // eslint-disable-next-line
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
