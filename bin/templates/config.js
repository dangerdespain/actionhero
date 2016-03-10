exports.default = {
  %%namespace%%: function(api){
    return {
      key : 'value',
      key2 : 'value2',
    };
  }
};

exports.test = {
  %%namespace%%: function(api){
    return {
      key2: 'value2-test',
    };
  }
};

exports.production = {
  %%namespace%%: function(api){
    return {};
  }
};
