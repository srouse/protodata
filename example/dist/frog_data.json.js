var __615361 = {
	_root : [
		'frog_1',
		'organization_7',
	],
	lookup : {
		frog_1 : {
			guid : 'frog_1',
			title : 'Marie Green',
			organizations : function() { return __615361.get( [
					'organization_2',
					'organization_3'
				])},
			frog_arr : function() { return __615361.get( [
					'frog_obj_4',
					'frog_obj_5'
				])},
			frog_obj : function() {   return __615361.get( 'frog_obj_6' )  },
			hi : 'SDDdd',
		},
		organization_7 : {
			guid : 'organization_7',
			title : 'Cheryl Foster',
			address : '685 2nd Avenue Rossville, GA 30741',
		},
		frog_1 : {
			guid : 'frog_1',
			title : 'Marie Green',
			organizations : function() { return __615361.get( [
					'organization_2',
					'organization_3'
				])},
			frog_arr : function() { return __615361.get( [
					'frog_obj_4',
					'frog_obj_5'
				])},
			frog_obj : function() {   return __615361.get( 'frog_obj_6' )  },
			hi : 'SDDdd',
		},
		organization_2 : {
			guid : 'organization_2',
			frog : function() {   return __615361.get( 'frog_1' )  },
			title : 'Tyler Ramirez',
			address : '795 8th Street Schenectady, NY 12302',
		},
		organization_3 : {
			guid : 'organization_3',
			frog : function() {   return __615361.get( 'frog_1' )  },
			title : 'Noah Sullivan',
			address : '447 14th Street Jonesborough, TN 37659',
		},
		organization_7 : {
			guid : 'organization_7',
			title : 'Cheryl Foster',
			address : '685 2nd Avenue Rossville, GA 30741',
		},
		frog_obj_4 : {
			guid : 'frog_obj_4',
			frog : function() {   return __615361.get( 'frog_1' )  },
			name : 'Kermit',
		},
		frog_obj_5 : {
			guid : 'frog_obj_5',
			frog : function() {   return __615361.get( 'frog_1' )  },
			name : 'Baron Silas Greenback',
		},
		frog_obj_6 : {
			guid : 'frog_obj_6',
			name : 'Demetan',
		},
	}

};
var protoData = ProtoData.createModel( __615361 )._root;// everything can be pulled from root