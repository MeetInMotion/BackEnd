
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.time('time');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.dropColumn('time');
  });
};
