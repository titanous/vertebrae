(function() {
  var BasicView, Controller;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  BasicView = function() {
    __extends(BasicView, Backbone.View);
    function BasicView(options) {
      BasicView.__super__.constructor.apply(this, arguments);
      this.color = options.color;
      this.title = options.title;
    }
    BasicView.prototype.render = function() {
      $(this.el).css('background-color', this.color).append("<h1>" + this.title + "</h1><p><a href='#one'>Page one</a><br/><a href='#two'>Page two</a><br/><a href='#three'>Page three</a></p>");
      return this;
    };
    return BasicView;
  }();
  Controller = function() {
    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }
    __extends(Controller, Backbone.Controller);
    Controller.prototype.routes = {
      '': 'home',
      'one': 'one',
      'two': 'two',
      'three': 'three'
    };
    Controller.prototype.home = function() {
      return Vertebrae.goHome();
    };
    Controller.prototype.one = function() {
      return Vertebrae.push(new BasicView({
        color: '#bcb8b9',
        title: 'Page One'
      }));
    };
    Controller.prototype.two = function() {
      return Vertebrae.push(new BasicView({
        color: '#99adb6',
        title: 'Page Two'
      }), 'slideup');
    };
    Controller.prototype.three = function() {
      return Vertebrae.push(new BasicView({
        color: '#61697e',
        title: 'Page Three'
      }), 'fade');
    };
    return Controller;
  }();
  ({
    app: {
      controller: new Controller
    }
  });
  $(document).ready(function() {
    return Backbone.history.start();
  });
}).call(this);
