(function() {
  "use strict";

  goatee.Utils = {
    extend: function(proto) {
      var self = this;

      for (var i = 1; i < arguments.length; i++) {
        var extensions = arguments[i];
        for (var property in extensions) {
          if (extensions[property] && extensions[property].constructor &&
              extensions[property].constructor === Object) {
            proto[property] = goatee.Utils.extend(
              proto[property] || {}, extensions[property]
            );
          } else {
            proto[property] = extensions[property];
          }
        }
      }

      return proto;
    }
  };
}).call(this);