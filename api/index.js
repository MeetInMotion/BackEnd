import express from 'express';

var api = express();

require('./routes')(api);

export default api;
