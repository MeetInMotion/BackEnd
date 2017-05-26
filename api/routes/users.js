import User from '../models/user';
import winston from 'winston';
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
    .post((req, res) => {
      User.where({id: req.params.id}).fetch()
        .then(user => {
          return user.events().attach([req.body.event]);
        })
        .then(() => {
          res.json({
            status: "success",
            message: "Added user to event successfully!",
          });
        })
        .catch(err => {
          winston.error(err);
        });
    });
};
