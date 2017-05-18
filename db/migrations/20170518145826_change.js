
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', function(table){
      table.dropColumn('coordinates');
    }),
    knex.schema.table('locations', function(table){
      table.json('coordinates');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', function(table){
      table.dropColumn('coordinates');
    }),
    knex.schema.table('locations', function(table){
      table.specificType('coordinates', 'POINT');
    }),
  ]);
};
