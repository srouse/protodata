

var ProtoData = function () {}

ProtoData.createModel = function( data ) {

    data.get = function ( obj_info ) {
        var obj;

        if ( typeof obj_info == "string" ) {
            obj = this.lookup[ obj_info ];
        }else if (
            Object.prototype.toString.call( obj_info ) === '[object Array]'
        ) {
            return this.getArray( obj_info );
        }else if ( obj_info && obj_info['guid'] ) {
            obj = this.lookup[ obj_info['guid'] ];
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

    return data;
}



var __12647 = {
	_root : [
		'frog_1',
		'organization_7',
	],
	lookup : {
		frog_1 : {
			guid : 'frog_1',
			title : 'Joan Rogers',
			organizations : function() { return __12647.get( [
					'organization_2',
					'organization_3'
				])},
			frog_arr : function() { return __12647.get( [
					'frog_obj_4',
					'frog_obj_5'
				])},
			frog_obj : function() {   return __12647.get( 'frog_obj_6' )  },
			hi : 'SDDdd',
		},
		organization_7 : {
			guid : 'organization_7',
			title : 'Peter Thomas',
			address : '284 Race Street Westerville, OH 43081',
		},
		frog_1 : {
			guid : 'frog_1',
			title : 'Joan Rogers',
			organizations : function() { return __12647.get( [
					'organization_2',
					'organization_3'
				])},
			frog_arr : function() { return __12647.get( [
					'frog_obj_4',
					'frog_obj_5'
				])},
			frog_obj : function() {   return __12647.get( 'frog_obj_6' )  },
			hi : 'SDDdd',
		},
		organization_2 : {
			guid : 'organization_2',
			frog : function() {   return __12647.get( 'frog_1' )  },
			title : 'Jesse Diaz',
			address : '447 14th Street Jonesborough, TN 37659',
		},
		organization_3 : {
			guid : 'organization_3',
			frog : function() {   return __12647.get( 'frog_1' )  },
			title : 'Rachel Wright',
			address : '321 Hillside Avenue Rocklin, CA 95677',
		},
		organization_7 : {
			guid : 'organization_7',
			title : 'Peter Thomas',
			address : '284 Race Street Westerville, OH 43081',
		},
		frog_obj_4 : {
			guid : 'frog_obj_4',
			frog : function() {   return __12647.get( 'frog_1' )  },
			name : 'De\'met\'an',
		},
		frog_obj_5 : {
			guid : 'frog_obj_5',
			frog : function() {   return __12647.get( 'frog_1' )  },
			name : 'Besobe\'so',
		},
		frog_obj_6 : {
			guid : 'frog_obj_6',
			name : 'Ba\'ron Silas Green\'back',
		},
	}

};
var protoData = ProtoData.createModel( __12647 )._root;// everything can be pulled from root