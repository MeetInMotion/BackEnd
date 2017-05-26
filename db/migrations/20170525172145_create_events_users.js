
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('events_users', function(table){
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('event_id').unsigned().references('id').inTable('events');
    table.primary(['user_id', 'event_id']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('events_users');
};
