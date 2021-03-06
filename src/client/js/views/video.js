import Backbone from 'backbone'
import Handlebars from 'handlebars'
import template from 'src/client/templates/video.hbs'
import $ from 'jquery'

class VideoView extends Backbone.View {
  get tagName () { return 'article' }
  get className () { return 'item' }
  get events () {
    return {
      'click .image': 'navigate',
      'click .title': 'navigate'
    }
  }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    let video = this.model.toJSON()
    let html = template(video)
    this.$el.html(html)
    return this
  }

  navigate (e) {
    e.preventDefault()
    let videoId = this.model.toJSON().idVideo
    AvrilTube.navigate(`watch?v=${videoId}`, { trigger: true })
  }
}

export default VideoView
