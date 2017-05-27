
exports.up = function(knex, promise) {
  return promise.all([
    knex.schema.table('events', function(table){
      table.dropforeign('user_id');
    }),
    knex.schema.table('events', function(table){
      table.foreign('user_id').references('id').intable('users').ondelete('set null');
    }),
  ]);
};

exports.down = function(knex, promise) {
  return promise.all([
    knex.schema.table('events', function(table){
      table.dropforeign('user_id');
    }),
    knex.schema.table('events', function(table){
      table.foreign('user_id').references('id').intable('users').ondelete('no action');
    }),
  ]);
};
