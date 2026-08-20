const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  try {

    const headerauth = req.headers.authorization;

    console.log("Authorization:", headerauth);

    if (!headerauth) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = headerauth.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();

  } catch (err) {

    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authmiddleware;