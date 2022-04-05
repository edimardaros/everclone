require('dotenv').config();
const secret = process.env.JWT_TOKEN;

const jwt = require('jasonwebtoken');

const User = require('../models/user');

const WithAuth = (req, res, next) => {
  const token = rew.headers['x-access-token']; // any name x-access-token pass with the request
  if(!token) // check if token is correct
    res.status(401).json({error: 'No Token provided!'});
  else {
    jwt.verify(token, secret, (err, decode) => {
      if(err)
        res.status(401).json({error: 'Invalid Token: '});
      else {
        req.email = decoded.email; // if token is correct, alter the request inserting email and user
        User.findOne({email: decoded.email})
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          res.status(401).json({error: err});
        })
      }
    })
  }
}

module.exports = WithAuth();