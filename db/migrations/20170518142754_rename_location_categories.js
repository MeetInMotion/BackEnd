
exports.up = function(knex, _Promise) {
  return knex.schema.renameTable('location_categories', 'categories_locations');
};

exports.down = function(knex, _Promise) {
  return knex.schema.renameTable('categories_locations', 'location_categories');
};
