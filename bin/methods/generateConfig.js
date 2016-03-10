var fs = require('fs');

exports.generateConfig = function(binary, path, next){
  if(!next){
    next = path;
    path = undefined;
  } 

  if(!binary.argv.namespace){ binary.utils.hardError('namespace is a required input'); }

  var data = fs.readFileSync(binary.actionheroRoot + '/bin/templates/config.js');
  data = String(data);

  [
    'namespace',
  ].forEach(function(v){
    var regex = new RegExp('%%' + v + '%%', 'g');
    data = data.replace(regex, binary.argv[v]);
  });

  binary.utils.createFileSafely(path || binary.config.general.paths.config[0] + '/' + binary.argv.namespace + '.js', data);

  next(true);
};
