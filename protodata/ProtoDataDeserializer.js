


var ProtoDataDeserializer = function () {
    this.last_id = 0;
    this.id_hash = {};
}

ProtoDataDeserializer.prototype.rebuildFromSerializedString = function ( json_str ) {
    var data = JSON.parse( json_str );
    this.rebuildFromSerializedJSON( data );
}

ProtoDataDeserializer.prototype.rebuildFromSerializedJSON = function ( data ) {
    var new_obj,obj_list;
    this.data = {};
    var obj;
    for ( var obj_name in data ) {
        obj_list = data[obj_name];
        this.data[obj_name] = [];
        for ( var o=0; o<obj_list.length; o++ ) {
            obj = obj_list[o];
            this.data[obj_name].push( obj );
            this.id_hash[ obj.id_full.id ] = obj;
            this.last_id = Math.max( obj.id_full.id , this.last_id );
        }
    }

    // now replace the ids...
    var obj;
    for ( var id in this.id_hash ) {
        obj = this.id_hash[id];
        for ( var prop_name in obj ) {
            prop_val = obj[prop_name];
            if ( Object.prototype.toString.call( prop_val ) === '[object Array]' ) {
                var arr_obj;
                for ( var a=0; a<prop_val.length; a++ ) {
                    arr_obj = prop_val[a];
                    if ( arr_obj.id_full ) {
                        obj[prop_name][a] = this.id_hash[arr_obj.id_full.id];
                    }
                }
            }else if ( typeof prop_val === 'object' ) {
                if ( prop_val.id_full ) {
                    obj[prop_name] = this.id_hash[prop_val.id_full.id];
                }
            }
        }
    }
}
