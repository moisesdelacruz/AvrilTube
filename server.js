const path = require('path')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

// templates
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
// static
app.use(express.static('public'))
// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/search?:q', (req, res) => {
  res.render('index')
})
// server listenign
server.listen(port, '0.0.0.0')
console.log(`Server running at http://localhost:${port}/`)
