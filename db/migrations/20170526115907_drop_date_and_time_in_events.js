
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.dropColumn('date');
    table.dropColumn('time');
    table.datetime('datetime');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.dropColum('datetime');
    table.date('date');
    table.column('time');
  });
};
