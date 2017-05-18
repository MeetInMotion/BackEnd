
exports.seed = function(knex, _Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: "1", name: 'löpspår'},
        {id: "2", name: 'utegym'},
        {id: "3", name: 'arenor'},
      ]);
    });
};
