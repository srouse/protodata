

var ProtoData = function () {
    this.last_id = 0;
    this.db = {};

    this.db_indexes = {};

    // Add Databases
    this.addDataViaPath("../databases/firstNames.js", "firstName");
    this.addDataViaPath("../databases/lastNames.js", "lastName");
    this.addDataViaPath("../databases/addresses.js", "address");
    this.addDataViaPath("../databases/nouns.js", "noun");
};


ProtoData.prototype.generateData = function ( config , arguments ) {
    this.config = config;
    this.data = {"_root":[]};

    this.root = {};

    var obj,config_obj,_root=[];
    for ( var obj_name in config ) {
        config_obj = config[obj_name];

        if ( config_obj.root === true ) {
            obj = this.generateObject( obj_name , false, false, 0, false, this.root , obj_name );
            _root.push( obj );
        }
    }

    this.data._root = _root;
    this.serializeData();

    return this.data;
}

ProtoData.prototype.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

ProtoData.prototype.generateArray = function (
    type , total ,
    parent , parent_prop_val
) {
    var type_obj = this.config[ type ];
    var data_arr = [],child;
    if ( type_obj ) {
        for ( var i=0; i<total; i++ ) {
            var child = this.generateObject(
                                type , parent , parent_prop_val , i
                            );
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

ProtoData.prototype.generateObject = function (
    type , parent ,
    parent_prop_val , index,
    args,
    quick_attach_parent,
    quick_attach_parent_name
) {
    if ( !index ) {
        index = 0;
    }
    var config_obj = this.config[ type ];

    if ( config_obj ) {
        var obj;
        this.data[ type ] = this.data[ type ] || [];

        obj = {};
        this.last_id++;
        obj.guid = type + "_" + this.data[ type ].length;

        if (
            !config_obj.max ||
            config_obj.max >= this.data[ type ].length
        ) {

            this.data[ type ].push( obj );

            if ( parent && parent_prop_val ) {
                obj[ parent_prop_val ] = parent;
            }

            if ( quick_attach_parent && quick_attach_parent_name ) {
                quick_attach_parent[quick_attach_parent_name] = obj;
            }

            config_obj.init.call( obj , this , index , config_obj, args );
        }

        return obj;
    }else{
        console.log( "No object type found:" + type );
        return {};
    }

}

ProtoData.prototype.serializeData = function () {
    var objects,obj,prop_val,guid_arr;

    var lookup = {};
    var new_data = {},new_obj;

    var js_lookup = {};
    var data_name = "__" + Math.round( Math.random() * 1000000 );
    var new_javascript = "var " + data_name + " = function () {\n";
    var new_javascript_lookup = "\tthis.lookup = {};\n";

    // walk through all objects ( already flat organziation of the data )
    for ( var obj_name in this.data ) {
        new_data[ obj_name ] = [];

        // don't care about any other objects but root
        // everything can be pulled from root objects...
        if ( obj_name == "_root" ) {
            new_javascript += "\tthis." + obj_name + " = [\n";
        }

        objects = this.data[ obj_name ];

        // walk through all the instances...
        for ( var i=0; i<objects.length; i++ ) {
            obj = objects[i];

            new_obj = {};
            new_data[ obj_name ].push( obj.guid );

            if ( obj_name == "_root" ) {
                new_javascript += "\t\t'"+ obj.guid +"',\n";
            }

            new_javascript_lookup += "\tthis.lookup['" + obj.guid + "'] = {\n";

            // walk through all the properties looking for nested objects
            for ( var prop_name in obj ) {
                prop_val = obj[prop_name];

                // an Array
                if (    Object.prototype.toString.call( prop_val )
                        === '[object Array]' ) {

                    var arr_obj;
                    new_obj[prop_name] = [];

                    var new_javascript_lookup_arr = [];
                    var guid_objs = 0, base_objs = 0;
                    for ( var a=0; a<prop_val.length; a++ ) {
                        arr_obj = prop_val[a];
                        if ( arr_obj && arr_obj.guid ) {
                            new_obj[prop_name].push( {guid:arr_obj.guid} );
                            new_javascript_lookup_arr.push( "'" + arr_obj.guid + "'" );
                            guid_objs++;
                        }else{
                            // empty entries are information
                            //new_obj[prop_name].push( false );
                            //new_javascript_lookup_arr.push( "false" );

                            if ( typeof arr_obj === "string" ) {
                                new_obj[prop_name].push( "'" + arr_obj + "'" );
                                new_javascript_lookup_arr.push( "'" + arr_obj + "'" );
                            }else{
                                new_obj[prop_name].push( arr_obj );
                                new_javascript_lookup_arr.push( arr_obj );
                            }
                            base_objs++;
                        }
                    }
                    if ( guid_objs > 0 ) {
                        new_javascript_lookup += "\t\t_" + prop_name + ":[" + new_javascript_lookup_arr.join(",") + "],\n";
                        new_javascript_lookup += "\t\tset " + prop_name + "( val ) {   delete this." + prop_name + "; this." + prop_name + " = val;  },\n";
                        new_javascript_lookup += "\t\tget " + prop_name + "() {   delete this." + prop_name + "; this." + prop_name + " = " + data_name + ".get( this._" + prop_name + " ); return this." + prop_name + ";  },\n";
                    }else{
                        new_javascript_lookup += "\t\t" + prop_name + ":[" + new_javascript_lookup_arr.join(",") + "],\n";
                    }

                // an Object
                }else if ( typeof prop_val === 'object' ) {

                    if ( prop_val.guid ) {
                        new_obj[prop_name] = {guid:prop_val.guid};
                        new_javascript_lookup += "\t\t_" + prop_name + ":'" + prop_val.guid + "',\n";
                        new_javascript_lookup += "\t\tset " + prop_name + "( val ) {   delete this." + prop_name + "; this." + prop_name + " = val;  },\n";
                        new_javascript_lookup += "\t\tget " + prop_name + "() {   delete this." + prop_name + "; this." + prop_name + " = " + data_name + ".get( this._" + prop_name + " ); return this." + prop_name + ";  },\n";

                    }else{
                        // Not an internal object reference...
                        new_obj[prop_name] = prop_val;
                        new_javascript_lookup += "\t\t" + prop_name + " : " + JSON.stringify( prop_val ) + ",\n";
                    }

                // simple String or Number
                }else{
                    new_obj[prop_name] = prop_val;
                    if ( typeof prop_val === "string" ) {
                        new_javascript_lookup += "\t\t" + prop_name + " : '" + prop_val.replace( /'/g , "\\'") + "',\n";
                    }else{
                        new_javascript_lookup += "\t\t" + prop_name + " : " + prop_val + ",\n";
                    }
                }
            }

            lookup[ obj.guid ] = new_obj;
            //new_javascript_lookup += "\t\t},\n";
            new_javascript_lookup += "\t};\n\n";

        }
        if ( obj_name == "_root" ) {
            new_javascript += "\t];\n\n";
        }
    }
    //new_javascript_lookup += "\t}\n";


    new_data.lookup = lookup;
    this.serializedJSON = new_data;
    this.serializedData = JSON.stringify( new_data );

    new_javascript += new_javascript_lookup;
    new_javascript += "\n};";

    new_javascript += "var " + data_name + " = new " + data_name + "();";
    new_javascript += "\nvar protoData = ProtoData.createModel( " + data_name + " )._root;// everything can be pulled from root";

    this.serialziedJavascript = new_javascript;

    return this.serializedData;
}


ProtoData.prototype.addDataViaPath = function ( databasePath, name ) {
    //this.db[name] = require(databasePath);
    this.addData( require(databasePath) , name );
}

ProtoData.prototype.addData = function ( database , name ) {
    this.db[name] = database;
}



//========================
// RANDOMNESS
//========================

ProtoData.prototype.randomObject = function ( dbName ) {
    var random_index = Math.round( Math.random() * (this.db[dbName].length-1) );
    return this.db[dbName][ random_index ];
}
ProtoData.prototype.incrementalObject = function ( dbName , localized_index_str ) {
    var index_str = dbName;
    if ( localized_index_str )
        index_str = dbName + "_|||||_" + localized_index_str;//it's global otherwise

    if ( !this.db_indexes[index_str] ) {
        this.db_indexes[index_str] = 0;
    }
    var object = this.db[dbName][ this.db_indexes[index_str] ];

    this.db_indexes[index_str]++;

    if ( this.db_indexes[index_str] > this.db[dbName].length-1 ) {
        this.db_indexes[index_str] = 0;
    }
    return object;
}

ProtoData.prototype.randomFromArray = function ( arr , total ) {

    var arr_length = arr.length;

    if ( !total ) {
        var random_index = Math.random() * ( arr_length - 1 );
        random_index = Math.round( random_index );
        return arr[ random_index ];
    }

    if ( total >= arr_length ) {
        return arr;
    }

    var new_array = [],random_index,index_lookup = {};
    while ( new_array.length < total ) {
        random_index = Math.random() * ( arr_length - 1 );
        random_index = Math.round( random_index );

        if ( !index_lookup["i_"+random_index] ) {
            index_lookup["i_"+random_index] = true;
            new_array.push( arr[ random_index ] );
        }

    }

    return new_array;
}

ProtoData.prototype.db_decorateRandom = function( obj, dbName ) {
    var val = this.randomObject( dbName );
    for(var key in val)
    {
        obj[key] = val[key];
    }
}

ProtoData.prototype.db_decorateIncremental = function( obj, dbName , localized_index_str) {
    var val = this.incrementalObject( dbName , localized_index_str );
    for(var key in val)
    {
        obj[key] = val[key];
    }
}

ProtoData.prototype.db_random = function( dbName ) {
    return this.randomObject( dbName );
}

ProtoData.prototype.db_incremental = function( dbName , localized_index_str ) {
    return this.incrementalObject( dbName , localized_index_str );
}




var module = module || {};
module.exports = ProtoData;
