

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('protodata');

    var configObj = {
        pkg: '<json:package.json>'
    };

    configObj.protodata = configObj.protodata || {};
    configObj.protodata["example"] = {
        files: {
            'dist/frog_data.json':
            [
                'Example.js'
            ]
        },
        options: {
            databases:{
                "frog":"databases/frogs.js"
            }
        }
    };

    configObj.watch = configObj.watch || {};
    configObj.watch["protodata"] = {
        files:[
            'Example.js'
        ],
        tasks: ["protodata:example"]
    };

    grunt.initConfig( configObj );
    // 'build' was put together in processProjects
    grunt.registerTask( 'default' , [
        'protodata:example'
    ] );


}
