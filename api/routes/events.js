import Event from '../models/event';
import winston from 'winston';

module.exports = function(router){
  router.route('/')
    .get((_req, res) => {
      Event.fetchAll({withRelated: ['location']})
        .then(collection => {
          res.json(collection);
        });
    })
    .post((req, res) =>{
      var event = {};
      event.title = "title1";
      event.date = "2017-06-03";
      event.time = "18:00+02";
      event.location_id = req.body.location_id;
      new Event(event).save().then(function(model){
        res.json(model);
      }).catch(function(err){
        winston.error(err);
      });
    });
  router.route('/:id')
    .get((req, res) =>{
      Event.where({id: req.params.id}).fetch({withRelated: ['location']})
        .then(event => {
          res.json(event);
        });
    });
};
