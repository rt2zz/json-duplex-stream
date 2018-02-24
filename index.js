'use strict'

var pump = require('pump')
var duplexify = require('duplexify')
var through = require('through2')
var lpstream = require('length-prefixed-stream')

module.exports = function JsonStream (stream) {
  var msgEncode = through.obj(function (data, enc, cb) {
    cb(null, JSON.stringify(data))
  })

  var msgDecode = through.obj(function (data, enc, cb) {
    cb(null, JSON.parse(data))
  })

  var dup = duplexify.obj()

  var lpEncode = lpstream.encode()
  var lpDecode = lpstream.decode()

  pump(msgEncode, lpEncode, stream)
  pump(stream, lpDecode, msgDecode)

  dup.setWritable(msgEncode)
  dup.setReadable(msgDecode)

  return dup
}
