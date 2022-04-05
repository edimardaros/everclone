require('dotenv').config();
const secret = process.env.JWT_TOKEN;

const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const withAuth = (req, res, next) => {
  // console.log(req)
  const token = req.headers['x-access-token'];
  if(!token) // check if token is correct
    res.status(401).json({error: 'No Token provided!'});
  else {
    jwt.verify(token, secret, (err, decode) => {
      if(err)
        res.status(401).json({error: 'Invalid Token: '});
      else {
        req.email = decode.email; // if token is correct, alter the request inserting email and user
        User.findOne({email: decode.email})
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

module.exports = withAuth;