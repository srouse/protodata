module.exports = {
  frog: {
    init: function (pd) {
      this.title = pd.db_incremental('firstName') + ' ' + pd.db_incremental('lastName');
      this.organizations = pd.generateArray(
        'organization', 2,
        this, 'frog'
      );

      this.frog_arr = pd.generateArray(
        'frog_obj', 2,
        this, 'frog'
      );
      this.frog_obj = pd.generateObject('frog_obj', this, 'pooba');

      this.frog_arr_incremental = pd.generateArray(
        'incr_frog_obj', 16,
        this, 'frog'
      );

      this.hi = 'SDDdd';
    },
    root: true
  },
  organization: {
    init: function (pd) {
      this.title = pd.db_incremental('firstName') + pd.db_random('lastName');
      this.address = pd.db_incremental('address');
    },
    root: false
  },
  frog_obj: {
    init: function (pd) {
      pd.db_decorateRandom(this, 'frog');
    }
  },
  incr_frog_obj: {
    init: function (pd) {
      this.title = pd.db_incremental('firstName', 'incr_frog_obj') +
        ' ' + pd.db_incremental('lastName', 'incr_frog_obj');
      pd.db_decorateIncremental(this, 'frog');
    }
  }
};
