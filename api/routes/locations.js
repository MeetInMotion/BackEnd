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
      Location.where({id: req.params.id}).fetch({withRelated: ['events', 'categories']})
        .then(location => {
          winston.info(location.related('events').toJSON());
          res.json(location);
        })
        .catch(err =>{
          winston.error(err);
        });
    });
  router.route('/:id/events')
    .get((req, res) =>{
      Location.where({id: req.params.id}).fetch({withRelated: ['events']})
        .then(location => {
          res.json(location.related('events').toJSON());
        })
    });
};
