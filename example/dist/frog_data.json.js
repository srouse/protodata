

var ProtoData = function () {}

ProtoData.createModel = function( data ) {

    data.get = function ( obj_info ) {
        var obj,lookup_obj,guid;

        // could be false (used in arrays for empty entry...)
        if ( !obj_info ) {
            return false;
        }

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

            //lets create an empty one!!!
            var guid_arr = guid.split("_");
            var guid_index = guid_arr[ guid_arr.length-1 ];
            guid_arr.pop();
            var guid_type = guid_arr.join("_");
            
            // just take the first one...
            var ref_obj = this.lookup[ guid_type + "_0" ];
            if (!ref_obj) {
                console.log( "COULDN'T FIND it again:" + guid );
                return false;
            }

            var new_obj = {};
            this.lookup[ guid ] = new_obj;

            for ( var name in ref_obj ) {
                if ( Object.prototype.toString.call( ref_obj[name] ) === '[object Array]' ) {
                    new_obj[ name ] = [];
                }else if ( Object.prototype.toString.call( ref_obj[name] ) === '[object Object]' ) {
                    var obj_guid = ref_obj[name].guid;
                    var obj_guid_arr = obj_guid.split("_");
                    obj_guid_arr.pop();
                    obj_guid = obj_guid_arr.join("_");
                    console.log( obj_guid + "_" + guid_index );
                    new_obj[ name ] = this.get( obj_guid + "_" + guid_index );
                }else{
                    new_obj[ name ] = "";
                }
            }
            new_obj.guid = guid;

            obj = new_obj;


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



var __459717 = function () {
	this._root = [
		'frog_0',
	];

	this.lookup = {};
	this.lookup['frog_0'] = {
		guid : 'frog_0',
		title : 'James Smith',
		_organizations:['organization_0','organization_1'],
		set organizations( val ) {   delete this.organizations; this.organizations = val;  },
		get organizations() {   delete this.organizations; this.organizations = __459717.get( this._organizations ); return this.organizations;  },
		_frog_arr:['frog_obj_0','frog_obj_1'],
		set frog_arr( val ) {   delete this.frog_arr; this.frog_arr = val;  },
		get frog_arr() {   delete this.frog_arr; this.frog_arr = __459717.get( this._frog_arr ); return this.frog_arr;  },
		_frog_obj:'frog_obj_2',
		set frog_obj( val ) {   delete this.frog_obj; this.frog_obj = val;  },
		get frog_obj() {   delete this.frog_obj; this.frog_obj = __459717.get( this._frog_obj ); return this.frog_obj;  },
		_frog_arr_incremental:['incr_frog_obj_0','incr_frog_obj_1','incr_frog_obj_2','incr_frog_obj_3','incr_frog_obj_4','incr_frog_obj_5','incr_frog_obj_6','incr_frog_obj_7','incr_frog_obj_8','incr_frog_obj_9','incr_frog_obj_10','incr_frog_obj_11','incr_frog_obj_12','incr_frog_obj_13','incr_frog_obj_14','incr_frog_obj_15'],
		set frog_arr_incremental( val ) {   delete this.frog_arr_incremental; this.frog_arr_incremental = val;  },
		get frog_arr_incremental() {   delete this.frog_arr_incremental; this.frog_arr_incremental = __459717.get( this._frog_arr_incremental ); return this.frog_arr_incremental;  },
		hi : 'SDDdd',
	};

	this.lookup['frog_0'] = {
		guid : 'frog_0',
		title : 'James Smith',
		_organizations:['organization_0','organization_1'],
		set organizations( val ) {   delete this.organizations; this.organizations = val;  },
		get organizations() {   delete this.organizations; this.organizations = __459717.get( this._organizations ); return this.organizations;  },
		_frog_arr:['frog_obj_0','frog_obj_1'],
		set frog_arr( val ) {   delete this.frog_arr; this.frog_arr = val;  },
		get frog_arr() {   delete this.frog_arr; this.frog_arr = __459717.get( this._frog_arr ); return this.frog_arr;  },
		_frog_obj:'frog_obj_2',
		set frog_obj( val ) {   delete this.frog_obj; this.frog_obj = val;  },
		get frog_obj() {   delete this.frog_obj; this.frog_obj = __459717.get( this._frog_obj ); return this.frog_obj;  },
		_frog_arr_incremental:['incr_frog_obj_0','incr_frog_obj_1','incr_frog_obj_2','incr_frog_obj_3','incr_frog_obj_4','incr_frog_obj_5','incr_frog_obj_6','incr_frog_obj_7','incr_frog_obj_8','incr_frog_obj_9','incr_frog_obj_10','incr_frog_obj_11','incr_frog_obj_12','incr_frog_obj_13','incr_frog_obj_14','incr_frog_obj_15'],
		set frog_arr_incremental( val ) {   delete this.frog_arr_incremental; this.frog_arr_incremental = val;  },
		get frog_arr_incremental() {   delete this.frog_arr_incremental; this.frog_arr_incremental = __459717.get( this._frog_arr_incremental ); return this.frog_arr_incremental;  },
		hi : 'SDDdd',
	};

	this.lookup['organization_0'] = {
		guid : 'organization_0',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'JohnCruz',
		address : '636 2nd Street North North Augusta, SC 29841',
	};

	this.lookup['organization_1'] = {
		guid : 'organization_1',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'RobertReye',
		address : '720 Hudson Street Marcus Hook, PA 19061',
	};

	this.lookup['frog_obj_0'] = {
		guid : 'frog_obj_0',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		name : 'Aoga\'eru',
	};

	this.lookup['frog_obj_1'] = {
		guid : 'frog_obj_1',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		name : 'De\'met\'an',
	};

	this.lookup['frog_obj_2'] = {
		guid : 'frog_obj_2',
		_pooba:'frog_0',
		set pooba( val ) {   delete this.pooba; this.pooba = val;  },
		get pooba() {   delete this.pooba; this.pooba = __459717.get( this._pooba ); return this.pooba;  },
		name : 'Aoga\'eru',
	};

	this.lookup['incr_frog_obj_0'] = {
		guid : 'incr_frog_obj_0',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'James Smith',
		name : 'Kermit',
	};

	this.lookup['incr_frog_obj_1'] = {
		guid : 'incr_frog_obj_1',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'John Johnson',
		name : 'Ba\'ron Silas Green\'back',
	};

	this.lookup['incr_frog_obj_2'] = {
		guid : 'incr_frog_obj_2',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Robert Williams',
		name : 'Aoga\'eru',
	};

	this.lookup['incr_frog_obj_3'] = {
		guid : 'incr_frog_obj_3',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Michael Brown',
		name : 'Besobe\'so',
	};

	this.lookup['incr_frog_obj_4'] = {
		guid : 'incr_frog_obj_4',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'William Jones',
		name : 'De\'met\'an',
	};

	this.lookup['incr_frog_obj_5'] = {
		guid : 'incr_frog_obj_5',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'David Miller',
		name : 'Ed Bighead',
	};

	this.lookup['incr_frog_obj_6'] = {
		guid : 'incr_frog_obj_6',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Richard Davis',
		name : 'Kermit',
	};

	this.lookup['incr_frog_obj_7'] = {
		guid : 'incr_frog_obj_7',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Joseph Garcia',
		name : 'Ba\'ron Silas Green\'back',
	};

	this.lookup['incr_frog_obj_8'] = {
		guid : 'incr_frog_obj_8',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Charles Rodriguez',
		name : 'Aoga\'eru',
	};

	this.lookup['incr_frog_obj_9'] = {
		guid : 'incr_frog_obj_9',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Thomas Wilson',
		name : 'Besobe\'so',
	};

	this.lookup['incr_frog_obj_10'] = {
		guid : 'incr_frog_obj_10',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Christopher Martinez',
		name : 'De\'met\'an',
	};

	this.lookup['incr_frog_obj_11'] = {
		guid : 'incr_frog_obj_11',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Daniel Anderson',
		name : 'Ed Bighead',
	};

	this.lookup['incr_frog_obj_12'] = {
		guid : 'incr_frog_obj_12',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Matthew Taylor',
		name : 'Kermit',
	};

	this.lookup['incr_frog_obj_13'] = {
		guid : 'incr_frog_obj_13',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Donald Thomas',
		name : 'Ba\'ron Silas Green\'back',
	};

	this.lookup['incr_frog_obj_14'] = {
		guid : 'incr_frog_obj_14',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Anthony Hernandez',
		name : 'Aoga\'eru',
	};

	this.lookup['incr_frog_obj_15'] = {
		guid : 'incr_frog_obj_15',
		_frog:'frog_0',
		set frog( val ) {   delete this.frog; this.frog = val;  },
		get frog() {   delete this.frog; this.frog = __459717.get( this._frog ); return this.frog;  },
		title : 'Mark Moore',
		name : 'Besobe\'so',
	};


};var __459717 = new __459717();
var protoData = ProtoData.createModel( __459717 )._root;// everything can be pulled from root