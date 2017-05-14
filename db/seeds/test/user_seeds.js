
exports.seed = function(knex, _Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'rowValue1'},
        {id: 2, email: 'rowValue2'},
        {id: 3, email: 'rowValue3'},
      ]);
    });
};
