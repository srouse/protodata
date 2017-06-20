'use strict';

var Client = require('client.js');
var ProtoData = require('ProtoData.js');
var ProtoDataDeserializer = require('ProtoDataDeserializer.js');

module.exports = {
  client: Client,
  protoData: ProtoData,
  protoDataDeserializer: ProtoDataDeserializer
};
