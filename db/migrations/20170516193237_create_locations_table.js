
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('locations', function(table){
    table.string('id').primary();
    table.string('name');
    table.specificType('coordinates', 'POINT');
    table.string('description');
    table.string('img_url');
    table.string('category').references('id').inTable('categories');
    table.timestamps();
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('locations');
};
