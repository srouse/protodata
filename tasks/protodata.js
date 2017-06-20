'use strict';

var async = require('async');
var path = require('path');

var ProtoData = require('../lib/ProtoData');
var protoData = new ProtoData();

module.exports = function (grunt) {
  grunt.registerMultiTask('protodata', 'generate random data fast', function () {
    var done = this.async();

    if (this.files.length < 1) {
      grunt.verbose.warn('Destination not written because no source files were provided.');
    }

    // Load in databases
    var options = this.options();
    var database;
    if (options.databases) {
      for (var databaseName in options.databases) {
        var databaseLoc = options.databases[databaseName];

        if (!grunt.file.exists(databaseLoc)) {
          grunt.log.warn('Source file "' + databaseLoc + '" not found.');
          return false;
        }

        database = JSON.parse(grunt.file.read(databaseLoc));
        protoData.addData(database, databaseName);
      }
    }

    var file;
    var dataConfig;
    var src;
    var srcObj;
    var dest;

    var files = this.files.slice();

    function process() {
      if (files.length <= 0) {
        done();
        return;
      }

      var file = files.pop();

      dest = file.dest;
      src = file.src[0];
      if (!grunt.file.exists(src)) {
        grunt.log.warn('Source file "' + src + '" not found.');
        return false;
      }

      srcObj = require(path.resolve(src));
      protoData.generateData(srcObj);

      grunt.file.write(
                path.resolve(dest),
                protoData.serializedData
            );

            // Make this file complete...
      var clientFilename = require.resolve('../lib/client.js');

      grunt.file.write(
                path.resolve(dest + '.js'),
                grunt.file.read(clientFilename) + '\n\n\n' +
                protoData.serialziedJavascript
            );

      process();
    }

    process();
  });
};
