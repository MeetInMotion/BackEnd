import config from '../config';
import db_config from '../knexfile.js';
var env = config('node:env');
var knex = require('knex')(db_config[env]);

export default knex;
