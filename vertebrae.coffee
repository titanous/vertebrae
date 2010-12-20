this.Vertebrae = Vertebrae =
  VERSION: '0.1'

  _history: []

  push: (view, transition) ->
    transition ||= 'slide'
    current = $('.active-view')
    reverse = false

    if _.isEmpty(@_history) and !@_homeView? # this is our first view change, save the home view
      @_homeView = current.get(0)

    # relatively naive history implementation
    if @_history.slice(-2,-1)[0]?.id == Backbone.history.getFragment() # we are going back
      transition = _.last(@_history).transition
      @_history.pop()
      reverse = true
    else
      @_history.push { id: Backbone.history.getFragment(), transition: transition }

    next = $(view.render().el)
    $('body').append next.css('display', 'none').addClass('view').get(0)
    @_transition(current, next, transition, reverse)

  goHome: ->
    if @_homeView?
      current = $('.active-view')
      home = $(@_homeView).attr('class', '').css('display', 'none').addClass('view')
      $('body').append home.get(0)
      @_transition(current, home, _.last(@_history).transition, true)

  _transition: (current, next, transition, reverse = false) ->
    reverse = if reverse then 'reverse' else ''
    current.addClass("out #{transition} #{reverse}")
    next.css('display', 'block').addClass("in #{transition} #{reverse} active-view")
    $(window).bind 'webkitAnimationEnd', ->
      current.remove()
      $('.active-view').removeClass('in').removeClass('reverse').removeClass(transition)
      $(window).unbind('webkitAnimationEnd')
