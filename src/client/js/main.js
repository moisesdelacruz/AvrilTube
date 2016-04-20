const $ = require('jquery')

var titleHeight = $(".title").height()
var $text = $(".title p")

while ( $text.outerHeight() > titleHeight ) {
  $text.text(function (index, text) {
    return text.replace(/\W*\s(\S)*$/, '...')
  })
}
