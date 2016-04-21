import Router from './routers/router'
import $ from 'jquery'
import Backbone from 'backbone'
Backbone.$ = $

$(() => {
  window.AvrilTube = new Router()
})
