import Backbone from 'backbone'
import VideoView from './video'
import $ from 'jquery'

class Home extends Backbone.View {
  get el () { return $('.content > .home') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (video) {
    let videoView = new VideoView({ model: video })
    this.$el.append(videoView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default Home
