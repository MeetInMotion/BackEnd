import morgan from 'morgan';
import vhost from 'vhost';
import express from 'express';
import api from './api';

var app = express();

app.use(morgan('dev'));
app.use(vhost('api.localhost', api));
app.use(vhost('localhost', express.static('./public')));


export default app;
