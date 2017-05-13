import User from '../models/user';
module.exports = function(router){
  router.route('/')
    .get((req, res, next) => {
      User.fetchAll().then((collection) => {
        res.json(collection);
      }).catch((err) => {
        console.log('there was and error:');
        console.log(err);
      })
    });
}
