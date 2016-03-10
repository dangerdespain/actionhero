var fs = require('fs');

exports.generatePlugin = function(binary, next){

  if(!binary.argv.name){ binary.utils.hardError('name is a required input'); }
  if(!binary.argv.namespace){ binary.argv.namespace = binary.argv.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }); }
  if(!binary.argv.description){ binary.argv.description = binary.argv.name; }
  if(!binary.argv.frequency){ binary.argv.frequency = 0; }
  if(!binary.argv.queue){ binary.argv.queue = 'default'; }

  var pluginPath = binary.config.general.paths.plugin[0] + '/' + binary.argv.name;

  binary.argv.dirname = binary.argv.name
  binary.argv.name = binary.argv.namespace
  
  binary.utils.createDirSafely(binary.config.general.paths.plugin[0]);
  
  binary.utils.createDirSafely(pluginPath);

  ['config', 'tasks', 'actions', 'initializers', 'public'].forEach(function(dir){
    binary.utils.createDirSafely(pluginPath + '/' + dir);
  })

  var components = [{
      template : '/bin/templates/config.js',
      destination : pluginPath + '/config/' + binary.argv.dirname + '.js',
    },{
      template : '/bin/templates/task.js',
      destination : pluginPath + '/tasks/' + binary.argv.dirname + '.js'
    },{
      template : '/bin/templates/action.js',
      destination : pluginPath + '/actions/' + binary.argv.dirname + '.js'
    },{
      template : '/bin/templates/initializer.js',
      destination : pluginPath + '/initializers/' + binary.argv.dirname + '.js'
    },{
      template : '/public/chat.html',
      destination : pluginPath + '/public/index.html'
    },{
      template : '/bin/templates/plugin/README.md',
      destination : pluginPath + '/README.md'
    },{
      template : '/bin/templates/plugin/template-package.json',
      destination : pluginPath + '/package.json'
    }
  ]

  components.forEach(function(component){

    var data = fs.readFileSync(binary.actionheroRoot + component.template);

    data = String(data);

    [
      'name',
      'namespace',
      'description',
      'queue',
      'frequency',
      'dirname',
    ].forEach(function(v){
      var regex = new RegExp('%%' + v + '%%', 'g');
      data = data.replace(regex, binary.argv[v]);
    });

    binary.utils.createFileSafely(component.destination, data);

  })

  next(true);
};
