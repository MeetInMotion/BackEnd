
exports.up = function(knex, _Promise) {
  return knex.schema.table('locations', function(table){
    table.renameColumn('category', 'category_id');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('locations', function(table){
    table.renameColumn('category_id', 'category');
  });
};
