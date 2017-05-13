import express from 'express';
import Config from '../environment';
import bodyParser from 'body-parser';
var app = express();

var router = express.Router();
require('../../app/routes')(app);
app.listen(Config.get('port'));
