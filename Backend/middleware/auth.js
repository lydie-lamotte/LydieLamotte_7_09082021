const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if(req.userId !=null){
      return next()
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_SECRET);
    const userId =  decodedToken.userId ;
    req.userId = userId ;
    return next();
  } catch(error) {
    console.log(error)
    return res.status(401).json({
      error: "Invalid request!"
    });
  }
};