import Category from '../models/category';
module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      Category.fetchAll().then((collection) => {
        res.json(collection);
      });
    });
  router.route('/:id')
    .get((req, res) =>{
      Category.where({id: req.params.id}).fetch({withRelated: ['locations']})
        .then(function(category){
          res.json(category.related('locations'));
        })
        .catch(function(err){
          console.log(err);
        });
    });
};
