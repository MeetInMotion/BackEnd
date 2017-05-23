import morgan from 'morgan';
import vhost from 'vhost';
import express from 'express';
import cors from 'cors';
import api from './api';


var app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(vhost('api.localhost', api));
app.use(vhost('localhost', express.static('./public')));


export default app;
