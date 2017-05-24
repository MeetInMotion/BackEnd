exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('users', function(table){
      table.timestamps(true, true);
    }),
    knex.schema.table('categories', function(table){
      table.dropTimestamps()
    }),
    knex.schema.table('categories', function(table){
      table.timestamps(true, true);
    }),
    knex.schema.table('events', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('events', function(table){
      table.timestamps(true, true);
    }),
    knex.schema.table('locations', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('locations', function(table){
      table.timestamps(true, true);
    }),
    knex.schema.table('categories_locations', function(table){
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('users', function(table){
      table.timestamps();
    }),
    knex.schema.table('categories', function(table){
      table.droptimestamps();
    }),
    knex.schema.table('categories', function(table){
      table.timestamps();
    }),
    knex.schema.table('events', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('events', function(table){
      table.timestamps();
    }),
    knex.schema.table('locations', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('locations', function(table){
      table.timestamps();
    }),
    knex.schema.table('categories_locations', function(table){
      table.dropTimestamps();
    })
  ]);
};
