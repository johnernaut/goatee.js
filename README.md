goatee.js
=========

Client library for the [goatee](https://github.com/johnernaut/goatee) notification server.

=========
### Building
`npm install && grunt`

=========
### Usage
Use `bind` to bind to as many channels as needed.  Once bound, you can send custom messages (data) to shose channels via `emit` as seen below.

```html
<!doctype html>
<html>
  <head>
    <title>YERP</title>
    <style type="text/css">
    html {
        overflow: hidden;
    }

    body {
        overflow: hidden;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background: gray;
    }

    #ws {
        background: white;
        margin: 0;
        padding: 0.5em 0.5em 0.5em 0.5em;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        right: 0.5em;
        bottom: 3em;
        overflow: auto;
    }

    #form {
        padding: 0 0.5em 0 0.5em;
        margin: 0;
        position: absolute;
        bottom: 1em;
        left: 0px;
        width: 100%;
        overflow: hidden;
    }

    </style>
  </head>
  <body>
    <h1>Websocket Messages:</h1>
    <ul id="ws">
    </ul>

    <form id="form">
      <input type="submit" value="Send" />
      <input type="text" id="msg" size="64"/>
    </form>
  </body>
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script src="./js/goatee.js"></script>
  <script>
    var gt = new goatee("ABC123LOLDU", "ws://localhost:1235/");
    
    // bind / listen to as many channels as needed.
    gt.bind('chan1', function(data) {
        $('#ws').append('<p>' + data.data + '</p>');
        $('#msg').val('');
    });

    $('#form').submit(function(e) {
      e.preventDefault();
      msg = $('#msg').val();
      
      // send data on channels you're bound to
      gt.emit('chan1', msg);
    });
  </script>
</html>
```
