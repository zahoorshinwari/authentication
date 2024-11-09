const jwt = require('jsonwebtoken');

const ensureAuthenticated = async (req, res, next) => {
    // Check if the Authorization header exists
    const authHeader = req.headers['authorization'];
    
    // If no Authorization header, send an Unauthorized response
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    // The token will be in the format: 'Bearer <token>'
    const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'

    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, "webjsonwebtoken");

        // Attach the decoded user info to the request object
        req.userInfo = decoded;
        console.log(decoded);

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        // If there's an error verifying the token, send a response indicating an issue
        return res.status(403).json({ message: "Token is not correct or expired" });
    }
}

module.exports = ensureAuthenticated;
