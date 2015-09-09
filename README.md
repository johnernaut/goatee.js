goatee.js
=========

Client library for the [goatee](https://github.com/johnernaut/goatee) notification server.

### Building

`npm install && grunt`

### Usage

Use `bind` to bind to as many channels as needed.  Once bound, you can send custom messages (data) to those channels via `emit` as seen in provided [example.html](example.html).