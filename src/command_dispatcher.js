(function() {
  "use strict";

  function CommandDispatcher() {
    this.callbacks = new CallStore();
  }

  var prototype = CommandDispatcher.prototype;

  prototype.bind = function (name, callback, ctx) {
    this.callbacks.add(name, callback, ctx);

    return this;
  };

  prototype.emit = function (eventName, data) {
    var i;
    var callbacks = this.callbacks.get(eventName);

    if (callbacks && callbacks.length > 0) {
      for (i = 0; i < callbacks.length; i++) {
        callbacks[i].fn.call(callbacks[i].ctx || window, data);
      }
    }

    return this;
  };

  // fix readonly error for callbacks...
  function CallStore() {
    this._callbacks = {};
  }

  CallStore.prototype.get = function(name) {
    return this._callbacks[name];
  };

  CallStore.prototype.add = function(name, callback, ctx) {
    this._callbacks[name] = this._callbacks[name] || [];
    this._callbacks[name].push({
      fn: callback,
      context: ctx
    });
  };

  goatee.CommandDispatcher = CommandDispatcher;
}).call(this);