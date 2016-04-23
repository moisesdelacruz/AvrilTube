import Backbone from 'backbone'
import VideoView from './video'
import $ from 'jquery'

class Home extends Backbone.View {
  get el () { return $('.content') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
  }

  render () {
    // clear element
    $('.recommended').empty()
    this.$el.empty()
    // create section
    let content = document.createElement('section')
    // add class home
    let clase = document.createAttribute('class')
    clase.value = 'home'
    content.setAttributeNode(clase)
    // add at the element
    this.$el.append(content)
    this.addAll()
  }

  addOne (video) {
    let videoView = new VideoView({ model: video })
    this.$el.find('.home').append(videoView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default Home
