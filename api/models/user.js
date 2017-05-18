import bookshelf from '../../initializers/bookshelf';

var User = bookshelf.model('User', {
  tableName: 'users',
});

export default User;
