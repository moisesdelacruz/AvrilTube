const path = require('path')
const http = require('http')
const express = require('express')
const youtube = require('youtube-finder')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080

const client = youtube.createClient({ key: 'AIzaSyAsvEZxR2vYOuxh0-gDFV97HRNaFmP9ZqQ' })
app.use(express.static('public'))
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './public', 'index.html'))
})

server.listen(3000)
console.log(`Server running at http://127.0.0.1:${port}/`)

io.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`)
  socket.on('search', (ask) => {
    console.log(ask)
    client.search({ part: 'snippet', q: ask, type: 'video' }, (err, data) => {
      socket.emit('result', data)
      var idVideo = data.items[0].id.videoId
      console.log(idVideo)
    })
  })
})
