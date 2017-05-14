import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import Config from '../environment';
//import bodyParser from 'body-parser';
var app = express();
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
}));
require('../../app/routes')(app);
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
}));

app.listen(Config.get('port'));
