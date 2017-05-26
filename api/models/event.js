import bookshelf from '../../initializers/bookshelf';
require('./location');
require('./user');
var Event = bookshelf.model("Event", {
  tableName: "events",
  location: function(){
    return this.belongsTo("Location");
  },
  users: function(){
    return this.belongsToMany('User');
  },
});

export default Event;
