var path = require('path');
require('dotenv').load({"path": path.resolve('./config/.env')});
var env = process.env.NODE_ENV || "development";
const config = {...getEnvConfig(env), ...process.env};


function getEnvConfig(env){
  var modules = require('require-dir')(); 
  var config = {};
  Object.keys(modules).forEach((module) => {
    config[module] = modules[module][env];
  });
  return config;
}

export default config;
