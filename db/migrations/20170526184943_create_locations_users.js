
exports.up = function(knex, _Promise) {
  return knex.schema.createTable('locations_users', table => {
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.string('location_id').unsigned().references('id').inTable('locations');
    table.primary(['user_id', 'location_id']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('locations_users'); 
};
