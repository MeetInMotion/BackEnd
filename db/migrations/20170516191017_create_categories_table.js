
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('categories', function(table){
    table.string('id').primary();
    table.string('name');
    table.timestamps();
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('categories');
};
