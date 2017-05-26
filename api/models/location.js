import bookshelf from '../../initializers/bookshelf';
require('./category');
var Location = bookshelf.model("Location", {
  tableName: "locations",
  categories: function(){
    return this.belongsToMany("Category");
  },
  events: function(){
    return this.hasMany('Event');
  },
});

export default Location;
