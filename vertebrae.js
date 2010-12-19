(function() {
  var Vertebrae;
  Vertebrae = {
    VERSION: '0.1',
    _viewStack: [],
    push: function(view, options) {
      var current, next;
      if (options == null) {
        options = {};
      }
      options.view = view;
      options.transition || (options.transition = 'slide');
      current = $('.active-view');
      if (this._viewStack.length === 0 && (current != null)) {
        this._viewStack.push({
          html: current.dom[0],
          transition: options.transition
        });
      }
      this._viewStack.push(options);
      next = $(view.render().el);
      $('body').append(next.css('display', 'none').addClass('view').selector);
      return this._transition(current, next, options.transition);
    },
    pop: function(options) {
      var current, next, transition;
      if (this._viewStack.length > 1) {
        transition = this._viewStack.pop().transition;
        next = this._viewStack.pop();
        current = $('.active-view');
        next = next.html != null ? $(next.html).attr('class', '') : $(next.view.render().el);
        $('body').append(next.css('display', 'none').addClass('view').selector);
        return this._transition(current, next, transition, true);
      }
    },
    _transition: function(current, next, transition, reverse) {
      if (reverse == null) {
        reverse = false;
      }
      reverse = reverse ? 'reverse' : '';
      current.addClass("out " + transition + " " + reverse);
      next.css('display', 'block').addClass("in " + transition + " " + reverse + " active-view");
      return $(window).bind('webkitAnimationEnd', function() {
        current.remove();
        $('.active-view').removeClass('in').removeClass('reverse').removeClass(transition);
        return $(window).unbind('webkitAnimationEnd');
      });
    }
  };
}).call(this);
