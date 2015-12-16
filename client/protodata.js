

var ProtoData = function () {}

ProtoData.createModel = function( data ) {

    data.get = function ( obj_info ) {
        var obj;

        if ( typeof obj_info == "string" ) {
            obj = this.lookup[ obj_info ];
        }else if ( Object.prototype.toString.call( obj_info )
                        === '[object Array]' ) {
            return this.getArray( obj_info );
        }else if ( obj_info['guid'] ) {
            obj = this.lookup[ obj_info['guid'] ];
        }

        if ( obj ) {
            return obj;
        }else{
            return false
        }
    }

    data.getArray = function ( obj_array ) {
        var arr = [];
        for ( var i=0; i<obj_array.length; i++ ) {
            arr.push( this.get( obj_array[i] ) );
        }
        return arr;
    }

    // process root into actual references
    var _root = {},id_str,type_str;
    for ( var i=0; i<data._root.length; i++ ) {
        id_str = data._root[i];
        type_str = id_str.split("_")[0];
        _root[ type_str ] = data.get( id_str );
    }
    data._root = _root;

    return data;
}
