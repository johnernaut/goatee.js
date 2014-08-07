(function() {
  "use strict";

  function ConnectionManager(url) {
    goatee.CommandDispatcher.call(this);

    this.url = url;
    this.connection = null;
    this.state = "initialized";
  }

  var prototype = ConnectionManager.prototype;
  goatee.Utils.extend(prototype, goatee.CommandDispatcher.prototype);

  prototype.connect = function() {
    var self = this;
    var compatible = this.checkCompatibility();

    if (compatible) {
      this.connection = new WebSocket(this.url);
      this.connection.onopen = function() { self.onOpen(); };
      this.connection.onmessage = function(data) { self.onMessage(data); };
      this.connection.onerror = function(err) { self.onError(err); };
      this.connection.onclose = function(err) { self.onClose(); };
    }
  };

  prototype.subscribe = function(name) {
    var self = this;

    this.waitForConnection(function() {
      var data = {
        channel: name,
        action: 'bind',
        token: 'ABC123'
      };

      self.connection.send(JSON.stringify(data));
    });
  };

  prototype.onOpen = function() {
    this.state = 'connected';
    this.emit('connected');
  };

  prototype.onError = function(err) {
    this.state = 'error';
    this.emit('error', err);
  };

  prototype.onClose = function() {
    this.state = 'closed';
    this.emit('closed');
  };

  prototype.onMessage = function(data) {
    this.emit('message', data);
  };

  prototype.send_event = function(name, data) {
    if (this.state !== 'connected') {
      this.emit('error', 'Not connected to the goatee server.');
      return;
    }

    var data = {
      channel: name,
      payload: data,
      action: 'message',
      token: 'ABC123'
    };

    this.connection.send(JSON.stringify(data));
  }

  // used to make sure there's a connection before a send is made
  prototype.waitForConnection = function(callback) {
    var self = this;

    setTimeout(function() {
      if (self.state === 'connected') {
        if (callback !== null) {
          callback();
        }
        return;
      } else {
        self.waitForConnection(callback);
      }
    }, 5);
  };

  prototype.checkCompatibility = function() {
    if (window.WebSocket === undefined) {
      this.emit('error', "WebSockets aren't supported on this browser.")
      return false;
    }

    return true;
  };

  goatee.ConnectionManager = ConnectionManager;
}).call(this);