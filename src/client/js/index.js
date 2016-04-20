const io = require('socket.io-client')
const $ = require('jquery')

const socket = io.connect()

socket.on('news', (data) => {
  console.log(data)
})
socket.on('result', (data) => {
  this.data = data.items[0]
  var video = document.getElementById('video')
  var title = document.getElementById('title')
  video.src = 'https://www.youtube.com/embed/' + this.data.id.videoId
  title.textContent = this.data.snippet.title
})

$('.form').submit((e) => {
  e.preventDefault()
  var search = $(e.target).find('#search').val()
  if (search !== '') {
    socket.emit('search', search)
    console.log(search)
  }
})
