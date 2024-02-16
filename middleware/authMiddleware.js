const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded); // This will print the decoded token

        console.log("User ID from Token:", decoded.id); 
        
        req.userData = decoded;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message); // Added to log any error in the middleware
        return res.status(401).json({ message: 'Auth failed' });
    }
};

module.exports = authMiddleware;
