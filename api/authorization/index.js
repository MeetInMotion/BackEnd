import jwt from 'jsonwebtoken';
import config from '../../config';
import winston from 'winston';
export default function authorize(id, roles){
  return function(req, res, next){
    winston.info('[Authorization] Getting header token');
    var token = req.get('authorization');
    var message;
    if(token){
      winston.info('[Authorization] Verifying token');
      jwt.verify(token, config.TOKEN_SECRET, function(err, decoded){
        if(!err){
          winston.info('[Authorization] Verifying user');
          var user_id = id || req.params.user_id || req.params.id;
          if(user_id == decoded.id){
            winston.info('[Authorization] User verified!');
            if(roles){
              winston.info('Roles are not implemented yet!');
            }else{
              next();
            }
          }else{
            message = 'Failed to verify user';
            winston.error('[Authorization] '+ message);
            winston.error('[Authorization] user_id: ' + user_id);
            winston.error('[Authorization] Token id: ' + decoded.id);
            res.status.(403).json({
              status: 'unsuccessful',
              message: message,
            });
          }
        }else{
          message = 'Failed to verify token';
          winston.info('[Authorization] ' + message);
          res.status(401).json({
            status: 'unsuccessful',
            message: message,
          });
        }
      });
    }else{
      message = 'No token provided!';
      winston.info('[Authorization] ' + message);
      res.status(401).json({
        status: 'unsuccessful',
        message: message,
      });
    }
  };
}
