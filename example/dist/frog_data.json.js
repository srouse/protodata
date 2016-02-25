

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



var __62331 = function () {
	this._root = [
		'frog_1',
		'organization_7',
	];

	this.lookup = {};
	this.lookup['frog_1'] = {
		guid : 'frog_1',
		title : 'Scott Hernandez',
		_organizations:['organization_2','organization_3'],
		set organizations( val ) {   delete this.organizations; this.organizations = val;  },
		get organizations() {   delete this.organizations; this.organizations = __62331.get( this._organizations ); return this.organizations;  },
		_frog_arr:['frog_obj_4','frog_obj_5'],
		set frog_arr( val ) {   delete this.frog_arr; this.frog_arr = val;  },
		get frog_arr() {   delete this.frog_arr; this.frog_arr = __62331.get( this._frog_arr ); return this.frog_arr;  },
		_frog_obj:'frog_obj_6',
		set frog_obj( val ) {   delete this.frog_obj; this.frog_obj = val;  },
		get frog_obj() {   delete this.frog_obj; this.frog_obj = __62331.get( this._frog_obj ); return this.frog_obj;  },
		hi : 'SDDdd',
	};

	this.lookup['organization_7'] = {
		guid : 'organization_7',
		title : 'VirginiaLee',
		address : '795 8th Street Schenectady, NY 12302',
	};

	this.lookup['frog_1'] = {
		guid : 'frog_1',
		title : 'Scott Hernandez',
		_organizations:['organization_2','organization_3'],
		set organizations( val ) {   delete this.organizations; this.organizations = val;  },
		get organizations() {   delete this.organizations; this.organizations = __62331.get( this._organizations ); return this.organizations;  },
		_frog_arr:['frog_obj_4','frog_obj_5'],
		set frog_arr( val ) {   delete this.frog_arr; this.frog_arr = val;  },
		get frog_arr() {   delete this.frog_arr; this.frog_arr = __62331.get( this._frog_arr ); return this.frog_arr;  },
		_frog_obj:'frog_obj_6',
		set frog_obj( val ) {   delete this.frog_obj; this.frog_obj = val;  },
		get frog_obj() {   delete this.frog_obj; this.frog_obj = __62331.get( this._frog_obj ); return this.frog_obj;  },
		hi : 'SDDdd',
	};

	this.lookup['organization_2'] = {
		guid : 'organization_2',
		_frog:'frog_1',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __62331.get( this._frog ); return this.frog;  },
		title : 'MarilynOrtiz',
		address : '781 State Street East West Des Moines, IA 50265',
	};

	this.lookup['organization_3'] = {
		guid : 'organization_3',
		_frog:'frog_1',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __62331.get( this._frog ); return this.frog;  },
		title : 'GaryJohnson',
		address : '355 Marshall Street West Deptford, NJ 08096',
	};

	this.lookup['organization_7'] = {
		guid : 'organization_7',
		title : 'VirginiaLee',
		address : '795 8th Street Schenectady, NY 12302',
	};

	this.lookup['frog_obj_4'] = {
		guid : 'frog_obj_4',
		_frog:'frog_1',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __62331.get( this._frog ); return this.frog;  },
		name : 'De\'met\'an',
	};

	this.lookup['frog_obj_5'] = {
		guid : 'frog_obj_5',
		_frog:'frog_1',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __62331.get( this._frog ); return this.frog;  },
		name : 'Ba\'ron Silas Green\'back',
	};

	this.lookup['frog_obj_6'] = {
		guid : 'frog_obj_6',
		name : 'Besobe\'so',
	};


};var __62331 = new __62331();
var protoData = ProtoData.createModel( __62331 )._root;// everything can be pulled from root