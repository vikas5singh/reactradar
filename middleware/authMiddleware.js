const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../config/.env'});

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports={requireSignIn}