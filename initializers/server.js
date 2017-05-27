import config from '../config';
import app from '../app';
import winston from 'winston';

app.listen(config.server.port);
winston.info('[Server] Now listening on port ' + config.server.port);
