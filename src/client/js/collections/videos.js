import Backbone from 'backbone'
import Video from '../models/video'

class Videos extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Video
  }
}

export default Videos
