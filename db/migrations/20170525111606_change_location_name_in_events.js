
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.renameColumn('location', 'location_id');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.renameColumn('location_id', 'location');
  });
};
