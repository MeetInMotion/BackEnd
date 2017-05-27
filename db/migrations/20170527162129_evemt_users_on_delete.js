
exports.up = function(knex, promise) {
  return promise.all([
    knex.schema.table('events_users', function(table){
      table.dropForeign('user_id');
    }),
    knex.schema.table('events_users', function(table){
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    }),
  ]);
};

exports.down = function(knex, promise) {
  return promise.all([
    knex.schema.table('events_users', function(table){
      table.dropForeign('user_id');
    }),
    knex.schema.table('events_users', function(table){
      table.foreign('user_id').references('id').inTable('users').onDelete('no action');
    }),
  ]);
};
