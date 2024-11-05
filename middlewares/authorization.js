const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send({
        error: "Unauthorized",
        message: "Authorization header is required",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        error: "Unauthorized",
        message: "Access Token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        error: "Unauthorized",
        message: "Access Token is expired",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = authorization;
