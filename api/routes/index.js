import express from 'express';
var routes = require('require-dir')();

module.exports = function(app){ 
  Object.keys(routes).forEach((route) => {
    var router = express.Router();
    require('./'+route)(router);
    app.use('/'+route, router);
  });
};
    
