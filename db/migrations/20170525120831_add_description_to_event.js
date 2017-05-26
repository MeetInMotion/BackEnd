
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.string('description');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.dropColumn('description');
  });
};
