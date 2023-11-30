const jwt = require("jsonwebtoken");

const KEY = "oljhcsaouhbgoq";

const verifyToken = (req, res, next) => {
  try {
    console.log('Verify Token Middleware Executed');

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        message: "Undefined header",
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    console.log("Token:", token);

    const payload = jwt.verify(token, KEY);

    console.log("Payload:", payload);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        message: "Undefined header",
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const payload = jwt.verify(token, KEY);

    if (!payload.admin) {
      return res.sendStatus(403);
    }

    req.payload = payload;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { verifyToken, verifyAdmin };
