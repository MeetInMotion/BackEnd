import request from 'request-promise';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../models/user';
import Promise from 'bluebird';
import winston from 'winston';

function createJwt(user){
  var payload = {
    id: user.id, 
  };
  
  var jwtOptions = {
    expiresIn: "2d",
  };
  return jwt.sign(payload, config.TOKEN_SECRET, jwtOptions);
}

module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      var access_token = req.query.access_token;
      var options = {
        uri: 'https://graph.facebook.com/me',
        qs: {
          access_token: access_token,
          fields: 'email,name',
        },
        json: true,
      };
      var getEmail = request(options);
      var getUser = getEmail.then(response => {
        return User.where({email: response.email}).fetch();
      });
      Promise.join(getEmail, getUser, (response, user) => {
        if(user){
          var token = createJwt(user);
          res.json({
            status: 'success',
            token: token,
            user: user,
          });
        }
        else{
          winston.info('[Authentication] Could not find user!');
          winston.info('[Authentication] Creating User!');
          new User({email: response.email, name: response.name}).save()
            .then(user =>{
              var token = createJwt(user);
              res.json({
                status: 'success',
                token: token,
                user: user,
              });
            });
        }
      }); 
    });
};
