import Event from '../models/event';

module.exports = function(router){
  router.route('/')
    .post((req, res) =>{
      var event = {};
      event.title = "title1";
      event.date = "2017-06-03";
      event.time = "18:00+02";
      event.location_id = req.body.location_id;
      new Event(event).save().then(function(model){
        console.log(model);
        res.json(model);
      }).catch(function(err){
        console.log("here is an error");
        console.log(err);
      });
    });
};
