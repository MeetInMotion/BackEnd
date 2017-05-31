exports.up = function(knex, promise) {
  return promise.all([
    knex.schema.table('events_users', function(table){
      table.dropForeign('event_id');
    }),
    knex.schema.table('events_users', function(table){
      table.foreign('event_id').references('id').inTable('events').onDelete('cascade');
    }),
  ]);
};

exports.down = function(knex, promise) {
  return promise.all([
    knex.schema.table('events_users', function(table){
      table.dropForeign('event_id');
    }),
    knex.schema.table('events_users', function(table){
      table.foreign('event_id').references('id').inTable('events').onDelete('no action');
    }),
  ]);
};
