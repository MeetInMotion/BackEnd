
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('email').unique();
    table.string('name');
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('users');
};
