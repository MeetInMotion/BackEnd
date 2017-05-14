import db from '../config/initializers/knex';
import chai from 'chai';

describe('Database', function(){
  before(function(done){
    db.migrate.latest().then(function(){
      done();
    });
  });
  beforeEach(function(done){
    db.seed.run().then(function(){
      done();
    });
  });
  it('should hava a user', function(done){
    db('users').select('email').where({id: 1}).then((result) => {
      chai.assert(result[0].email == 'rowValue1');
      done();
    });
  });
});
