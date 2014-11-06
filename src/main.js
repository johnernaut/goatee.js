(function() {
  "use strict";

  function goatee(key, url) {
    validateKey(key);
    var self = this;

    this.channel = null;

    this.event_emitter = new goatee.CommandDispatcher();
    this.connection = new goatee.ConnectionManager(url);

    this.connection.bind('connected', function() {
      self.connected = true;
      console.log("Connected to goatee server.");
    });

    this.connection.bind('message', function(data) {
      console.log(self.channel);
      self.event_emitter.emit(self.channel, data);
    });

    this.connection.bind('error', function(err) {
      console.warn("Error connecting to goatee server: " + err);
    });

    this.connection.bind('closed', function() {
      console.warn("Connection to the goatee server was closed.")
    });

    this.connect(key);
  }

  var prototype = goatee.prototype;

  goatee.connected = false;

  prototype.bind = function(name, callback) {
    this.channel = name;
    this.connection.subscribe(name);
    this.event_emitter.bind(name, callback);
    return this;
  };

  prototype.emit = function(name, data) {
    this.connection.send_event(name, data);
    return this;
  };

  prototype.connect = function(key) {
    this.connection.connect(key);
  };

  function validateKey(key) {
    if (key === null || key === undefined)
      console.warn("An API key must be supplied.");
  }

  this.goatee = goatee;
}).call(this);
