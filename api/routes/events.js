import Event from '../models/event';
import winston from 'winston';
import User from '../models/user';
import Location from '../models/location';
import Promise from 'bluebird';

module.exports = function(router){
  router.route('/')
    .get((_req, res) => {
      Event.fetchAll({withRelated: ['location', 'users']})
        .then(collection => {
          res.json(collection);
        });
    })
    .post((req, res) =>{
      var fetchUsers = User.fetchAll();
      var fetchLocations = Location.fetchAll();
      Promise.join(fetchUsers, fetchLocations, (users, locations) => { 
        var user_ids = users.pluck('id');
        var location_ids = locations.pluck('id');
        req.checkBody('title', 'Missing title').notEmpty();
        req.checkBody('datetime', 'datetime must be valid ISO 8601 date').isISO8601();
        req.checkBody('user_id', "User does not exist").isIn(user_ids);
        req.checkBody('description', "Missing description").notEmpty();
        req.checkBody('location_id', "Location does not exits").isIn(location_ids);

        return req.getValidationResult();
      })
        .then(result => {
          if(!result.isEmpty()){
            res.status(400).json({
              status: 'unsucessful',
              message: 'There was validation errors!',
              errors: result.array(),
            });
            throw new Error('Validation Errors!');
          }else{
            var event = {};
            event.title = req.body.title;
            event.datetime = req.body.datetime;
            event.user_id = req.body.user_id;
            event.description = req.body.description;
            event.location_id = req.body.location_id;
            return new Event(event).save();
          }
        })
        .then(function(event){
          console.log(event);
          return event.users().attach([event.get('user_id')]);
        })
        .then(() => {
          res.json({
            status: 'success',
            message: 'Created event successfully!',
          });
        })
        .catch(function(err){
          winston.error(err.message);
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
    .get((req, res) => {
      Event.where({id: req.params.id}).fetch({withRelated: ['users']})
        .then(event => {
          res.json(event.related('users').toJSON());
        });
    });
  router.route('/:id/users/:user_id')
    .get((req, res) =>{
      Event.where({id: req.params.id}).fetch({withRelated: ["users"]})
        .then(event => {
          var ids = event.related('users').pluck("id");
          console.log(typeof req.params.user_id);
          res.json({
            attending: ids.includes(parseInt(req.params.user_id)) ? true : false,
          });
        });
    })
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
