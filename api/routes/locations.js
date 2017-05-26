import location from '../models/location.js';
import winston from 'winston';

module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      location.fetchAll().then(collection => {
        res.json(collection);
      });
    });
  router.route('/:id')
    .get((req, res) => {
      location.where({id: req.params.id}).fetch({withrelated: ['events', 'categories']})
        .then(location => {
          res.json(location);
        })
        .catch(err =>{
          winston.error(err);
        });
    });
};
