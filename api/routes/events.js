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
      event.title = req.body.title;
      event.date = req.body.date;
      event.time = req.body.time;
      event.user_id = req.body.owner;
      event.description = req.body.description;
      event.location_id = req.body.location_id;
      new Event(event).save()
        .then(function(model){
          return model.users().attach([event.user_id])
            .then(function(_collection){
              return model.fetch({withRelated: ['users']});
            })
            .then(function(event){
              console.log(event);
              res.json(event);
            });
        })
        .catch(function(err){
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
