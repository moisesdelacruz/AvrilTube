import Backbone from 'backbone'
import $ from 'jquery'

class App extends Backbone.View {
  get el () { return 'body' }
  get events (){
    return {
      'submit .form': 'navigate',
      'click .logo': 'home'
    }
  }

  initialize () {
    this.$menu = $('.menu')
  }

  navigate (e) {
    e.preventDefault()
    let query = $('.form').find('#search').val()
    AvrilTube.navigate(`search?${query}`, { trigger: true })
  }

  home () {
    AvrilTube.navigate('', { trigger: true })
  }
}
export default App
