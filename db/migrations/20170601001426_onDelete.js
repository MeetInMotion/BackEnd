exports.up = function(knex, promise) {
  return promise.all([
    knex.schema.table('locations_users', function(table){
      table.dropForeign('user_id');
    }),
    knex.schema.table('locations_users', function(table){
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function(knex, promise) {
  return promise.all([
    knex.schema.table('locations_users', function(table){
      table.dropForeign('user_id');
    }),
    knex.schema.table('locations_users', function(table){
      table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL');
    }),
  ]);
};
