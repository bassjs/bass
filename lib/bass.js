var path = require('path');
var Liftoff = require('liftoff');
var fs = require('fs');
var _ = require('lodash');

var cli = new Liftoff({
  name: 'bass',
  moduleName: 'bass',
  configName: 'bassfile',
  processTitle: 'bass',
  configLocationFlag: 'bassfile',
  cwdFlag: 'cwd',
  preloadFlag: 'require',
  completionFlag: 'completion',
  completions: function (type) {
    console.log('Completions not implemented.');
  }
});

cli.launch(launcher);

function launcher(env) {
  var argv = env.argv;
  var config = {};
  var commands = require('./commands');
  var command = _.first(argv._);
  if (!command) {
    command = 'fetch-latest';
  }
  commands[command](config, argv);
}
