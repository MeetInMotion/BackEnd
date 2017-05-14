var nconf = require('nconf');
require('dotenv').load({path: './config/environment/.env'});

var Config = function() {
  nconf.argv().env("_");
  var env = nconf.get("NODE:ENV") || "development";
  nconf.add(env, {type: "literal", store:require("./"+ env +".js")});
  nconf.file("default", "./default.json");
};

Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = new Config();
