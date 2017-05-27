import User from '../models/user';
import Event from '../models/event';
import winston from 'winston';
import authorize from '../authorization';
module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      User.fetchAll().then((collection) => {
        res.json(collection);
      });
    })
    .post((req, res) => {
      var newUser = {};
      newUser.email = req.body.email;
      newUser.name = req.body.name;
      new User(newUser).save()
        .then(user => {
          return user.fetch();
        })
        .then(user => {
          res.json(user);
        })
        .catch(err =>{
          winston.error(err);
        });
    });
  router.route('/:id')
    .get((req, res) => {
      User.where({id: req.params.id}).fetch()
        .then(user => {
          res.json(user);
        });
    })
    .delete((req, res) => {
      User.where({id: req.params.id}).destroy()
        .then(() => {
          res.json({message: "successfully deleted user"});
        });
    });
  router.route('/:id/events')
    .get((req, res) => {
      User.where({id: req.params.id}).fetch({withRelated: ['events']})
        .then(user => {
          res.json(user.related('events').toJSON());
        });
    })
    .post(authorize())
    .post((req, res) => {
      Event.fetchAll()
        .then(events => {
          var event_ids = events.pluck('id');
          req.checkBody('event', 'event id not valid').isIn(event_ids);
          return req.getValidationResult();
        })
        .then(result => {
          if(!result.isEmpty){
            res.status(400).json({
              status: 'unsuccessful',
              message: 'There where validation errors!',
              errors: result.array(),
            });
            throw new Error('There where validation errors');
          }else{
            return User.where({id: req.params.id}).fetch();
          }
        })
        .then(user => {
          return user.events().attach([req.body.event]);
        })
        .then((events) => {
          res.json({
            status: "success",
            message: "Added user to event successfully!",
            events: events,
          });
        })
        .catch(err => {
          winston.error(err.message);
        });
    });
  router.route('/:id/events/:event_id')
    .delete((req, res) => {
      User.where({id: req.params.id}).fetch()
        .then(user => {
          user.events().detach([req.params.event_id]);
          res.json({
            status: "success",
            message: "successfully removed user from event!",
          });
        });
    });

  router.route('/:id/locations')
    .get((req, res) => {
      User.where({id: req.params.id}).fetch({withRelated: ['locations']})
        .then(user => {
          res.json(user.related('locations').toJSON());
        });
    })
    .post((req, res) => {
      User.where({id: req.params.id}).fetch()
        .then(user => {
          return user.locations().attach([req.body.location]);
        })
        .then(() => {
          res.json({
            status: "success",
            message: "Added location to user successfully!",
          });
        });
    });

  router.route('/:id/locations/:location_id')
    .delete((req, res) => {
      User.where({id: req.params.id}).fetch()
        .then(user => {
          return user.locations().detach([req.params.location_id]);
        })
        .then(() => {
          res.json({
            status: "success",
            message: "Successfully deleted location from user!",
          });
        });
    });
};
