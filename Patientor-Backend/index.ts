import express from 'express'
const app = express()
const PORT = 3003

app.use(express.json())

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen( PORT, () => {
  console.log('Server run on port', PORT);
  
})