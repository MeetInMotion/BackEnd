import bookshelf from '../../config/initializers/bookshelf';

var User = bookshelf.Model.extend({
  tableName: 'users'
});

export default User;
