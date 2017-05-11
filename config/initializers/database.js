import Config from '../environment';
import db_config from '../../knexfile.js';
import winston from 'winston';

var env = Config.get('NODE:ENV');
var knex = require('knex')(db_config[env]);

export default knex;
