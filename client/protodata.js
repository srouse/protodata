

var ProtoData = function () {}

ProtoData.createModel = function( data ) {

    data.get = function ( obj_info ) {
        var obj,lookup_obj,guid;

        if ( typeof obj_info == "string" ) {
            guid = obj_info;
        }else if (
            Object.prototype.toString.call( obj_info ) === '[object Array]'
        ) {
            return this.getArray( obj_info );
        }else if ( obj_info && obj_info['guid'] ) {
            guid = obj_info['guid'];
        }

        lookup_obj = this.lookup[ guid ];

        if ( !lookup_obj ) {
            console.log( "COULDN'T FIND:" + guid );
            /*
            //lets create a random one!
            var guid_arr = guid.split("_");
            var lookup_arr = this.obj_lookup[ guid_arr[0] ];
            var arr_length = lookup_arr.length;
            var random_index = Math.round( Math.random() * ( arr_length - 1 ) );

            var lookup_obj = this.lookup[ lookup_arr[random_index] ];

            obj = new lookup_obj();
            obj.guid = guid;

            this.lookup[ guid ] = function () {};
            this.lookup[ guid ].prototype = obj;
            */

        }else{
            obj = lookup_obj;//new lookup_obj();
        }

        if ( obj ) {
            return obj;
        }else{
            return false;
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

    // you should be able to walk around with just the _root,
    // so get lookup is added to it...
    _root.get = function ( obj_info ) {
        return data.get( obj_info );
    }

    return data;
}
