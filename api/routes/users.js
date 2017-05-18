import User from '../models/user';
module.exports = function(router){
  router.route('/')
    .get((req, res, _next) => {
      User.fetchAll().then((collection) => {
        res.json(collection);
      });
    });
};
