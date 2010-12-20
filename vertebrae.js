(function() {
  var Vertebrae;
  this.Vertebrae = Vertebrae = {
    VERSION: '0.1',
    _history: [],
    push: function(view, transition) {
      var current, next, reverse, _ref;
      transition || (transition = 'slide');
      current = $('.active-view');
      reverse = false;
      if (_.isEmpty(this._history) && !(this._homeView != null)) {
        this._homeView = current.get(0);
      }
      if (((_ref = this._history.slice(-2, -1)[0]) != null ? _ref.id : void 0) === Backbone.history.getFragment()) {
        transition = _.last(this._history).transition;
        this._history.pop();
        reverse = true;
      } else {
        this._history.push({
          id: Backbone.history.getFragment(),
          transition: transition
        });
      }
      next = $(view.render().el);
      $('body').append(next.css('display', 'none').addClass('view').get(0));
      return this._transition(current, next, transition, reverse);
    },
    goHome: function() {
      var current, home;
      if (this._homeView != null) {
        current = $('.active-view');
        home = $(this._homeView).attr('class', '').css('display', 'none').addClass('view');
        $('body').append(home.get(0));
        return this._transition(current, home, _.last(this._history).transition, true);
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
