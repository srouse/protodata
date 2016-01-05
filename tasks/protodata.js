'use strict';

var async = require('async');
var path = require("path");
var fileSave = require('file-save');

var ProtoData = require("../protodata/ProtoData");
var protoData = new ProtoData();

module.exports = function (grunt) {

    grunt.registerMultiTask('protodata', 'generate random data fast', function () {
		var done = this.async();

		if ( this.files.length < 1 ) {
		    grunt.verbose.warn('Destination not written because no source files were provided.');
	    }

        // load in databases
        var options = this.options();
        var database;
        if ( options.databases ) {
            for ( var database_name in options.databases ) {
                var database_loc = options.databases[ database_name ];

                if (!grunt.file.exists( database_loc )) {
                      grunt.log.warn('Source file "' + database_loc + '" not found.');
                      return false;
                }

                database = JSON.parse( grunt.file.read( database_loc ) );
                protoData.addData( database , database_name );
            }
        }

        // process into final files
        var file,data_config,src,src_obj,dest;
		for ( var f=0; f<this.files.length; f++ ) {
            file = this.files[f];

            dest = file.dest;
            src = file.src[0];
            if (!grunt.file.exists( src )) {
                  grunt.log.warn('Source file "' + src + '" not found.');
                  return false;
            }

            src_obj = require( path.resolve( src ) );
            protoData.generateData( src_obj );

            fileSave( path.resolve( dest ) )
                    .write( protoData.serializedData );

            fileSave( path.resolve( dest + ".js" ) )
                    .write( protoData.serialziedJavascript );
        }

    });

}
