var Config = require('../environment');
var db_config = require('../../knexfile.js');
var env = Config.get('NODE:ENV');
var knex = require('knex')(db_config[env]);
module.exports = knex;
knex.migrate.latest(db_config[env]);  
