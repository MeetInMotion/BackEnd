import Config from './config/environment';
import express from 'express';
import winston from 'winston';
import async from 'async';
var app = express();
var db;
var server;

winston.info('[APP] Initializing...');
async.series([
  function initDb(callback){
    db = require('./config/initializers/database.js');
    callback();
  },
  function initServer(callback){
    server = require('./config/initializers/server.js');
    callback();
  }],
  function(err){
    if(err != undefined){
      winston.error('[APP] Failed to initialize '+ error);
    }else {
      winston.info('[APP] Initialized ');
    }
  }
)
