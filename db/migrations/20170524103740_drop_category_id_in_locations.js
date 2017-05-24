
exports.up = function(knex, Promise) {
  return knex.schema.table('locations', function(table){
    table.dropColumn('category_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('locations', function(table){
    table.string('category_id');
  });
};
