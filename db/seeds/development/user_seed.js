
exports.seed = function(knex, _Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'egan1551@gmail.com', name: 'Eric'},
        {email: 'annika.svedin@gmail.com', name: 'Annika'},
        {email: 'texxez@hotmail.com', name: 'Teo'},
        {email: 'figster@gmail.com', name: 'Cecilia'},
        {email: 'Handboll17@live.se', name: 'Sebastian'},
        {email: 'Pontussandliden@hotmail.com', name: 'Pontus'},
        {email: 'alzeht@gmail.com', name: 'Sebastian'},
      ]);
    });
};
