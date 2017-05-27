import request from 'request-promise';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../models/user';
import Promise from 'bluebird';
import winston from 'winston';
module.exports = function(router){
  router.route('/')
    .get((req, res) => {
      var access_token = req.query.access_token;
      var options = {
        uri: 'https://graph.facebook.com/me',
        qs: {
          access_token: access_token,
          fields: 'email',
        },
        json: true,
      };
      var getEmail = request(options);
      var verifyEmail = getEmail.then(response => {
        return User.where({email: response.email}).fetch();
      });
      Promise.join(getEmail, verifyEmail, (response, user) => {
        if(user){
          var payload = {
            id: user.id, 
          };
            
          var jwtOptions = {
            expiresIn: "2d",
          };
          var token = jwt.sign(payload, config.TOKEN_SECRET, jwtOptions);
          res.json({
            status: 'success',
            token: token,
            user: user,
          });
        }
        else{
          winston.error('[Authentication] Could not authenticate user!');
          winston.error(response);
          res.json({
            status: 'unsuccessful',
            message: 'was not able to authenticate with access_token!',
          });
        }
      }); 
    });
};
