import Backbone from 'backbone'
import $ from 'jquery'
import youtube from 'youtube-finder'
import Video from 'src/client/js/models/video'
import Videos from 'src/client/js/collections/videos'
import Actual from 'src/client/js/collections/actual'
import RecommendedCollection from 'src/client/js/collections/recommended'
import Home from 'src/client/js/views/home'
import App from 'src/client/js/views/app'
import Player from 'src/client/js/views/player'
import Recommended from 'src/client/js/views/recommended'

const client = youtube.createClient({ key: 'AIzaSyAsvEZxR2vYOuxh0-gDFV97HRNaFmP9ZqQ' })

class Router extends Backbone.Router {
  get routes () {
    return {
      '': 'index',
      'results?search_query=:q': 'search',
      'watch?v=:videoId': 'player'
    }
  }

  initialize () {
    this.current = {}
    this.jsonData = {}
    this.videos = new Videos()
    this.actual = new Actual()
    this.recommendedCollection = new RecommendedCollection()
    this.home = new Home({ collection: this.videos})
    this.recommended = new Recommended({ collection: this.recommendedCollection })
    this.app = new App()
    this.player = new Player({ model: new Video() })

    Backbone.history.start({
      root: ''
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
    // Obtener Relacionados..
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
      this.jsonData.items.forEach(this.callAddVideoRecommended, this)
    })
    // Obtener Actual..
    client.search({ part:'snippet', type:'video', q:videoId, maxResults:1 }, (err, data) => {
      if (err) console.log(err)

      this.actual.reset()
      this.jsonData = data
      this.jsonData.items.forEach(this.getVideo, this)
      AvrilTube.player.model.set(this.actual.toJSON()[0])
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
      this.jsonData.items.forEach(this.callAddVideo, this)
    })
  }

  getVideo (data) {
    let video = data
    this.addVideo(video, this.actual)
  }

  callAddVideo (data) {
    let video = data
    this.addVideo(video, this.videos)
  }

  callAddVideoRecommended (data) {
    let video = data
    this.addVideo(video, this.recommendedCollection)
  }

  addVideo (video, collection) {
    collection.add(new Video({
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
