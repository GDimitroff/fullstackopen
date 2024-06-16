import express from 'express'

const app = express()

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

const PORT = 3003
const ENV = process.env.NODE_ENV

const array2 = [1, 2, 3, 4, 5]
array2.map((d) => console.log(d))

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} on ${ENV}`)
})
