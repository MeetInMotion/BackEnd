import db from '../config/initializers/database.js';
import chai from 'chai';

describe('World!', function(){
  it('should be greeted', function(){
    var greeting = "hello world";
    chai.assert(greeting == "hello world");
  });
});

describe('Database', function(){
  it('should hava a user', function(done){
    db('users').select('email').where({id: 1}).then((result) => {
      console.log();
     chai.assert(result[0].email == 'rowValue1');
      done();
    }).catch((err) => {
      console.log("there was an error");
      done(err);
    })
  });
});
