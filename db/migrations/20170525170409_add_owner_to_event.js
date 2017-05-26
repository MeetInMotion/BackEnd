
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.integer('user_id').unsigned().references('id').inTable('users');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropColumn('user_id');
};
