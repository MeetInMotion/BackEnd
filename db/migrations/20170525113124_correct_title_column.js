
exports.up = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.renameColumn('tile', 'title');
  }); 
};

exports.down = function(knex, _Promise) {
  return knex.schema.table('events', function(table){
    table.renameColumn('title', 'tile');
  }); 
};
