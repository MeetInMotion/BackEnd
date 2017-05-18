import bookshelf from '../../initializers/bookshelf';
require('./category');
var Location = bookshelf.model("Location", {
  tableName: "locations",
  category: function(){
    return this.belongsToMany("Category");
  },
});

export default Location;
