
exports.seed = function(knex, _Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'eric@mim.com', name: 'Eric'},
        {email: 'annika@mim.com', name: 'Annika'},
        {email: 'teo@mim.com', name: 'Teo'},
        {email: 'fig@mim.com', name: 'Cecilia'},
        {email: 'sebastian@mim.com', name: 'Sebastian'},
        {email: 'pontus@mim.com', name: 'Pontus'},
        {email: 'thezla@mim.com', name: 'Sebastian'},
      ]);
    });
};
