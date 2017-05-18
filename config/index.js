var nconf = require('nconf');
require('dotenv').load({path: './config/.env'});
nconf.argv().env({lowerCase: true, separator: '_'});
var env = nconf.get("node:env") || "development";
nconf.add(env, {type: "literal", store: getEnvConfig(env)});
nconf.file("default", "./default.json");

function getEnvConfig(env){
  var modules = require('require-dir')(); 
  var config = {};
  Object.keys(modules).forEach((module) => {
    config[module] = modules[module][env];
  });
  return config;
}

var config = function(key) {
  return nconf.get(key);
};

export default config;
