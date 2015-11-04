

module.exports = {
    frog:{
        init:function ( pd ) {
            this.title = pd.db_random( "firstName" ) + " " + pd.db_random( "lastName" );
            this.organizations = 	pd.generateArray(
                                        "organization" ,  2  ,
                                        this , "frog"
                                    );

            this.frog_obj = pd.generateArray(
                                        "frog_obj" ,  2,
                                        this , "frog"
                                    );

            this.hi = "SDD";
        },
        root:true
    },
    organization:{
        init:function ( pd ) {
            this.title = pd.db_random( "firstName" ) + " " + pd.db_random( "lastName" );
            this.address = pd.db_random( "address" );
        }
    },
    frog_obj:{
        init:function ( pd ) {
            pd.db_decorateRandom( this , "frog" );
        }
    }
};