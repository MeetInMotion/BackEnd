
exports.up = function(knex, _Promise) {
  return knex.schema.table('locations', function(table){
    table.text('description').alter();
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('location', function(table){
    table.string('description').alter();
  });
};
