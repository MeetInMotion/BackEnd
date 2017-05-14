import User from '../models/user';
import winston from 'winston';
module.exports = function(router){
  router.route('/')
    .get((req, res, _next) => {
      User.fetchAll().then((collection) => {
        res.json(collection);
      }).catch((err) => {
        winston.error(err);
      });
    });
};
