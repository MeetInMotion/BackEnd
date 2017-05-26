import Event from '../models/event';
import winston from 'winston';

module.exports = function(router){
  router.route('/')
    .get((_req, res) => {
      Event.fetchAll({withRelated: ['location', 'users']})
        .then(collection => {
          res.json(collection);
        });
    })
    .post((req, res) =>{
      var event = {};
      event.title = req.body.title;
      event.datetime = req.body.datetime;
      event.user_id = req.body.user_id;
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
      Event.where({id: req.params.id}).fetch({withRelated: ['location', 'users']})
        .then(event => {
          res.json(event);
        });
    });
  router.route('/:id/users')
    .post((req, res) => {
      Event.where({id: req.params.id}).fetch()
        .then(event => {
          return event.users().attach([req.body.user]);
        })
        .then(() => {
          res.json({
            status: "success",
            message: "Successfully added user to event!",
          });
        })
        .catch(err => {
          winston.error(err);
          res.json({
            status: "unsuccessful",
            message: "Could not add user to event!",
          });
        });
    });
  router.route('/:id/users/:user_id')
    .delete((req, res) => {
      Event.where({id: req.params.id}).fetch()
        .then(event => {
          return event.users().detach([req.params.user_id]);
        })
        .then(() => {
          res.json({
            status: 'success',
            message: 'Successfully deleted user from event',
          });
        }) 
        .catch(err => {
          winston.error(err);
          res.json({
            status: 'unsuccessful',
            message: 'Could not remove user from event!',
          });
        });
    });
};
