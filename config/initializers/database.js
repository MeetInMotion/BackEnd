import Config from '../environment';
import db_config from '../../knexfile.js';
import winston from 'winston';
import async from 'async';

var env = Config.get('NODE:ENV');
var knex = require('knex')(db_config[env]);


knex.migrate.latest().then(function(){
  knex.seed.run();
});
export default knex;
