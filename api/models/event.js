import bookshelf from '../../initializers/bookshelf';
require('./location');
var Event = bookshelf.model("Event", {
  tableName: "events",
  location: function(){
    return this.belongsTo("Location");
  },
});

export default Event;
