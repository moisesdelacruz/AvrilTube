import Backbone from 'backbone'
import youtube from 'youtube-finder'
import Video from 'src/client/js/models/video'
import Videos from 'src/client/js/collections/videos'
import Home from 'src/client/js/views/home'
import App from 'src/client/js/views/app'

const client = youtube.createClient({ key: 'AIzaSyAsvEZxR2vYOuxh0-gDFV97HRNaFmP9ZqQ' })

class Router extends Backbone.Router {
  get routes () {
    return {
      '': 'index',
      'search?:q': 'search',
      'watch?:videoId': 'player'
    }
  }

  initialize () {
    this.current = {}
    this.jsonData = {}
    this.videos = new Videos()
    this.home = new Home({ collection: this.videos})
    this.app = new App()

    Backbone.history.start({
      root: '/',
      pushState: true
    })
  }

  index () {
    this.fetchData('')
  }

  search (query) {
    this.fetchData(query)
  }

  fetchData (query) {
    let params = {
      part: 'snippet',
      channelId: 'UCC6XuDtfec7DxZdUa7ClFBQ',
      type: 'video',
      q: query,
      maxResults: 20
    }
    client.search(params, (err, data) => {
      this.videos.reset()
      this.jsonData = data
      this.jsonData.items.forEach(this.addVideo, this)
    })
  }

  addVideo (video) {
    this.videos.add(new Video({
      idVideo: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      channelId: video.snippet.channelId,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      image: video.snippet.thumbnails.medium
    }))
  }
}

export default Router
