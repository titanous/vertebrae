class BasicView extends Backbone.View
  constructor: (options) ->
    super
    @color = options.color
    @title = options.title

  render: ->
    $(@el).css('background-color', @color).
    append("<h1>#{@title}</h1><p><a href='#one'>Page one</a><br/><a href='#two'>Page two</a><br/><a href='#three'>Page three</a></p>")
    return this

class Controller extends Backbone.Controller
  routes:
    '': 'home',
    'one': 'one',
    'two': 'two',
    'three': 'three'

  home: ->
    Vertebrae.goHome()

  one: ->
    Vertebrae.push new BasicView({color: '#bcb8b9', title: 'Page One'})

  two: ->
    Vertebrae.push new BasicView({color: '#99adb6', title: 'Page Two'}), 'slideup'

  three: ->
    Vertebrae.push new BasicView({color: '#61697e', title: 'Page Three'}), 'fade'

app:
  controller: new Controller

$(document).ready ->
  Backbone.history.start()
