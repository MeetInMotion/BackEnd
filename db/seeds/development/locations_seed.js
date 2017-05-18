
exports.seed = function(knex, _Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: "1", category_id: '1', name: "löp1"},
        {id: "2", category_id: '1', name: "löp2"},
        {id: "3", category_id: '2', name: "utegym1"},
      ]);
    });
};
