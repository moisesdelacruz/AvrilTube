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
    query = query.replace(/\s/g,"+")
    AvrilTube.navigate(`results?search_query=${query}`, { trigger: true })
  }

  home () {
    AvrilTube.navigate('', { trigger: true })
  }
}
export default App
