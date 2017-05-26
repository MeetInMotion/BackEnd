import bookshelf from '../../initializers/bookshelf';
require('./event');

var User = bookshelf.model('User', {
  tableName: 'users',
  events: function(){
    return this.belongsToMany('Event');
  },
});

export default User;
