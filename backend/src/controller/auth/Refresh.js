const { verifyToken } = require("../../hooks/JWThelper");
const { LoginData } = require("./LoginData");

const Refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send({
      success: false,
      message: "Refresh token is required",
    });
  }

  // Verify the refresh token
  const decoded = verifyToken(refreshToken, "jwtSecret");
  if (!decoded) {
    return res.status(403).send({
      success: false,
      message: "Invalid or expired refresh token",
    });
  } else {
    LoginData(decoded, req, res, "Token refreshed", refreshToken);
  }
};

module.exports = { Refresh };
