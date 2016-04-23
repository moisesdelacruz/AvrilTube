import Backbone from 'backbone'
import template from 'src/client/templates/player.hbs'
import $ from 'jquery'

class Player extends Backbone.View {
  get el () { return $('.content') }

  initialize () {
    this.listenTo(this.model, 'change', this.render)
  }

  render () {
    this.$el.empty()
    let video = this.model.toJSON()
    let html = template(video)
    this.$el.html(html)
  }
}

export default Player
