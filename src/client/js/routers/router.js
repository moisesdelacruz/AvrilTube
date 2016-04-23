import Backbone from 'backbone'
import $ from 'jquery'
import youtube from 'youtube-finder'
import Video from 'src/client/js/models/video'
import Videos from 'src/client/js/collections/videos'
import RecommendedCollection from 'src/client/js/collections/recommended'
import Home from 'src/client/js/views/home'
import App from 'src/client/js/views/app'
import Player from 'src/client/js/views/player'
import Recommended from 'src/client/js/views/recommended'

const client = youtube.createClient({ key: 'YOUR_KEY' })

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
    this.recommendedCollection = new RecommendedCollection()
    this.home = new Home({ collection: this.videos})
    this.recommended = new Recommended({ collection: this.recommendedCollection })
    this.app = new App()
    this.player = new Player({ model: new Video() })

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

  player (videoId) {
    console.log(videoId)
    let params = {
      part: 'snippet',
      channelId: 'UCC6XuDtfec7DxZdUa7ClFBQ',
      relatedToVideoId: videoId,
      type: 'video',
      maxResults: 10
    }
    client.search(params, (err, data) => {
      if (err) console.log(err)

      this.recommendedCollection.reset()
      this.jsonData = data
      this.jsonData.items.forEach(this.addVideo2, this)
    })
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

  addVideo2 (video) {
    this.recommendedCollection.add(new Video({
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
