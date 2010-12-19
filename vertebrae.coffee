Vertebrae =
  VERSION: '0.1'

  _viewStack: []

  push: (view, options = {}) ->
    options.view = view
    options.transition ||= 'slide'
    current = $('.active-view')

    if @_viewStack.length == 0 and current? # the first view is prerendered
      @_viewStack.push { html: current.dom[0], transition: options.transition }

    @_viewStack.push options
    next = $(view.render().el)
    $('body').append next.css('display', 'none').addClass('view').selector
    @_transition(current, next, options.transition)

  pop: (options) ->
    if @_viewStack.length > 1 # we have something to go back to
      transition = @_viewStack.pop().transition # get the transition we used
      next = @_viewStack.pop() # get the view we are going back to
      current = $('.active-view')
      next = if next.html? then $(next.html).attr('class', '') else $(next.view.render().el)
      $('body').append next.css('display', 'none').addClass('view').selector
      @_transition(current, next, transition, true)

  _transition: (current, next, transition, reverse = false) ->
    reverse = if reverse then 'reverse' else ''
    current.addClass("out #{transition} #{reverse}")
    next.css('display', 'block').addClass("in #{transition} #{reverse} active-view")
    $(window).bind 'webkitAnimationEnd', ->
      current.remove()
      $('.active-view').removeClass('in').removeClass('reverse').removeClass(transition)
      $(window).unbind('webkitAnimationEnd')
