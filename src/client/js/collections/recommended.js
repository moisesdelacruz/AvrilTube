import Backbone from 'backbone'
import Video from '../models/video'

class Recommended extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Video
  }
}

export default Recommended
