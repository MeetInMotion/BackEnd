import Location from '../models/location.js';
import winston from 'winston';

module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      Location.fetchAll().then(collection => {
        res.json(collection);
      });
    });
  router.route('/:id')
    .get((req, res) => {
      Location.where({id: req.params.id}).fetch()
        .then(location => {
          res.json(location);
        })
        .catch(err =>{
          winston.err(err);
        });
    });
};
