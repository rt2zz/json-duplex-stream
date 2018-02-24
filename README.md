# json-duplex-stream

Given a regular duplex stream, this module will return a duplex stream
optimised for sending and receiving json strings.

## Usage

```js
var net = require('net')
var jsonStream = require('json-duplex-stream')

var server = net.createServer(function (socket) {
  var dup = jsonStream(socket)

  dup.on('data', function (obj) {
    console.log(obj) // { hello: 'world' }
  })
})

server.listen(3000, function () {
  var dup = jsonStream(net.connect(3000))
  dup.write({hello: 'world'})
})
```

## License

MIT
