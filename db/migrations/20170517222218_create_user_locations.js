
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('location_categories', function(table){
    table.primary(['location_id', 'category_id']);
    table.string('location_id').references('id').inTable('locations');
    table.string('category_id').references('id').inTable('categories');
  }); 
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('location_categories');
};
