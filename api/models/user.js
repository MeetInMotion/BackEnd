import bookshelf from '../../initializers/bookshelf';
require('./event');
require('./location');

var User = bookshelf.model('User', {
  tableName: 'users',
  events: function(){
    return this.belongsToMany('Event');
  },
  locations: function(){
    return this.belongsToMany('Location');
  },
});

export default User;
