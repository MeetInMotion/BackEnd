
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('events', function(table){
    table.increments('id');
    table.string('tile');
    table.string('location').references('id').inTable('locations');
    table.date('date');
    table.timestamps();
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('events');
};
