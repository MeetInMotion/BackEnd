import bookshelf from '../../initializers/bookshelf';
require('./location');
var Category = bookshelf.model("Category", {
  tableName: 'categories',
  locations: function(){
    return this.belongsToMany("Location");
  },
});

export default Category;
