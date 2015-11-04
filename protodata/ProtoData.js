

var ProtoData = function () {
    this.last_id = 0;
    this.db = {};

    // Add Databases
    this.addDataViaPath("../databases/firstNames.js", "firstName");
    this.addDataViaPath("../databases/lastNames.js", "lastName");
    this.addDataViaPath("../databases/addresses.js", "address");
    this.addDataViaPath("../databases/nouns.js", "noun");
};

ProtoData.prototype.generateData = function ( config , arguments ) {
    this.config = config;
    this.data = {};
    var obj,config_obj;
    for ( var obj_name in config ) {
        config_obj = config[obj_name];

        if ( config_obj.root === true ) {
            obj = this.generateObject( obj_name );
        }
    }

    this.serializeData();
    return this.data;
}

ProtoData.prototype.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

ProtoData.prototype.generateArray = function ( type , total , parent , parent_prop_val ) {
    var type_obj = this.config[ type ];
    var data_arr = [],child;
    if ( type_obj ) {
        for ( var i=0; i<total; i++ ) {
            var child = this.generateObject( type , parent , parent_prop_val , i );
            if ( parent && parent_prop_val ) {
                child[ parent_prop_val ] = parent;
            }
            data_arr.push( child );
        }
    }else{
        console.log( "No object type found:" + type );
    }
    return data_arr;
}

ProtoData.prototype.generateObject = function ( type , parent , parent_prop_val , index ) {
    if ( !index ) {
        index = 0;
    }
    var config_obj = this.config[ type ];
    var obj = {};
    this.last_id++;
    obj.guid = type + "_" + this.last_id;

    this.data[ type ] = this.data[ type ] || [];
    this.data[ type ].push( obj );

    if ( parent && parent_prop_val ) {
        obj[ parent_prop_val ] = parent;
    }

    if ( config_obj ) {
        config_obj.init.call( obj , this , index );
    }else{
        console.log( "No object type found:" + type );
    }
    return obj;
}

ProtoData.prototype.serializeData = function () {
    var objects,obj,prop_val;
    var new_data = {},new_obj;

    var lookup = {};
    for ( var obj_name in this.data ) {
        new_data[ obj_name ] = [];
        objects = this.data[ obj_name ];
        for ( var i=0; i<objects.length; i++ ) {
            obj = objects[i];
            new_obj = {};
            new_data[ obj_name ].push( obj.guid );
            for ( var prop_name in obj ) {
                prop_val = obj[prop_name];
                if ( Object.prototype.toString.call( prop_val ) === '[object Array]' ) {
                    var arr_obj;
                    new_obj[prop_name] = [];
                    for ( var a=0; a<prop_val.length; a++ ) {
                        arr_obj = prop_val[a];
                        if ( arr_obj.guid ) {
                            new_obj[prop_name].push( {guid:arr_obj.guid} );
                        }
                    }
                }else if ( typeof prop_val === 'object' ) {
                    if ( prop_val.guid ) {
                        new_obj[prop_name] = {guid:prop_val.guid};
                    }else{
                        new_obj[prop_name] = prop_val;
                    }
                }else{
                    new_obj[prop_name] = prop_val;
                }
            }

            lookup[ obj.guid ] = new_obj;
        }
    }

    new_data.lookup = lookup;
    this.serializedJSON = new_data;
    this.serializedData = JSON.stringify( new_data );
    return this.serializedData;
}

ProtoData.prototype.addDataViaPath = function ( databasePath, name ) {
    //this.db[name] = require(databasePath);
    this.addData( require(databasePath) , name );
}
ProtoData.prototype.addData = function ( database , name ) {
    this.db[name] = database;
}

ProtoData.prototype.randomObject = function ( dbName ) {
    var random_index = Math.round( Math.random() * this.db[dbName].length-1 );
    return this.db[dbName][ random_index ];
}

ProtoData.prototype.db_decorateRandom = function( obj, dbName ) {
    var val = this.randomObject( dbName );
    for(var key in val)
    {
        obj[key] = val[key];
    }
}

ProtoData.prototype.db_random = function( dbName ) {
    return this.randomObject( dbName );
}

var module = module || {};
module.exports = ProtoData;
