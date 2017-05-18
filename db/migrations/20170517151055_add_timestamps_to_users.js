
exports.up = function(knex, _Promise) {
  return knex.schema.table('users', function(table){
    table.timestamps();
  });
};

exports.down = function(knex, _Promise) {
  return knex.table('users').dropTimestamps();
};
