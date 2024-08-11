const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 
require('dotenv').config();
// All the token activities are handled by the middleware.
module.exports = function (req, res, next) {
    try {
        const token = req.header('x-token');//tokens anni headers lo send chestam so we used header
        console.log(token);
        if (!token) {
            return res.status(400).send('Token not found');
        }

        // If the token is there, then we will verify
        const decoded = jwt.verify(token,secretKey);//ee step lo token ni verify chesi decode chesi decoded variable lo pettesthunnam

        // After decoding, we will get the same payload that we have sent while signing
        req.id = decoded.id; // Here we are decoding because we are passing that user particular id to the /myblog

        // In the req.user, whoever logged in, that user id will be there
        next(); // We use next() because we will be sending our request user to the /myblogs route GET http call
    } catch (err) {
        console.error(err);
        return res.status(500).send('Invalid token'+err); // This means there's some error in the try block
    }
};


// const jwt = require('jsonwebtoken');
// require('dotenv').config(); // Ensure dotenv is configured before use
// const secretKey = process.env.JWT_SECRET;

// module.exports = function (req, res, next) {
//     console.log('Request headers:', req.headers); // Log all headers for debugging
//     try {
//         const token = req.headers['x-token']; // Use 'x-token' from headers
//         console.log('Token from header:', token); // Log token for debugging

//         if (!token) {
//             return res.status(400).send('Token not found');
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, secretKey);
//         req.id = decoded.id; // Attach user id to the request
//         next();
//     } catch (err) {
//         console.error('JWT verification error:', err.message);
//         return res.status(500).send('Invalid token: ' + err.message);
//     }
// };
