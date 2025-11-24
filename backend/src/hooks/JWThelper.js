const jwt = require("jsonwebtoken");

function generateAccessToken(user, secret = "jwtSecret") {
  return jwt.sign(user, secret, {
    expiresIn: "1d",
  });
}

function generateRefreshToken(user, secret = "jwtSecret") {
  return jwt.sign(user, secret, {
    expiresIn: "7d",
  });
}

const verifyToken = (token, secret = "jwtSecret") => {
  try {
    // Remove "Bearer " prefix if present
    if (typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }
    if (!token || token === "null" || token === "undefined") {
      return null;
    }
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
