var converter = require('./coordinate_converter');
import winston from 'winston';
import knex from '../initializers/knex';

var locationData = require('./sthlm/locations');
var categoryData = require('./sthlm/categories');
var locations = [];
var locationCategories = [];
var categories = [];
winston.info('migrating latest');
knex.migrate.latest()
  .then(function(){
    winston.info('clearing categories_locations');
    return knex('categories_locations').del();
  })
  .then(function(){
    winston.info('clearing locations');
    return knex('locations').del();
  })
  .then(function(){
    winston.info('clearing categories');
    return knex('categories').del();
  })
  .then(function(){
    
    categoryData.forEach(function(data){
      var category = {};
      category.id = data.Id;
      category.name = data.SingularName;
      categories.push(category);
    });
    locationData.forEach(function(data){
      var location = {}; 
      data['Attributes'].forEach(function(attribute){
        switch (attribute["Id"]){
        case "Image":{
          location.img_url = "http://api.stockholm.se/ServiceGuideService/ImageFiles/" + attribute["Value"]["Id"] + "/data?apikey=23c9c3e39cd64cbeb66170063773ee81";
          break;
        }
        case "ShortDescription": {
          location.description = attribute["Value"];
          break;
        }
        }
      });
      location.id = data.Id; 
      location.name = data.Name;
      var RT90 = data.GeographicalPosition;
      location.coordinates = converter(RT90.X, RT90.Y);
      locations.push(location);
      data.ServiceUnitTypes.forEach(function(category){    
        if(categories.filter((e) => e.id == category.Id).length > 0){
          locationCategories.push({
            "location_id": location.id,
            "category_id": category.Id,
            
          });
        }
      });
    });
    winston.info('inserting locations');
    return knex('locations').insert(locations);
  })
  .then(function(){
    winston.info('inserting categories');
    return knex('categories').insert(categories);
  })
  .then(function(){
    winston.info('inserting location_categories');
    return knex('categories_locations').insert(locationCategories);
  })
  .then(function(){
    winston.info("finished");
  })
  .catch(function(err){
    winston.error(err);
  })
  .finally(function(){
    return knex.destroy();
  });
