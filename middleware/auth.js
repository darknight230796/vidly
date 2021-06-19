const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided.');

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}