const { db } = require("../../utils/setting");
const { generateAccessToken } = require("../../hooks/JWThelper");
const { generateRefreshToken } = require("../../hooks/JWThelper");

const LoginData = (result, req, res, message, previousRefreshToken = null) => {
  const user = {
    id: result.id,
    first_name: result.first_name,
    last_name: result.last_name,
    email: result.email,
    role: result.role,
  };

  const accessToken = generateAccessToken(user, "jwtSecret");
  const refreshToken = generateRefreshToken(user, "jwtSecret");

  res.status(200).send({
    success: true,
    message: message,
    first_name: result.first_name,
    last_name: result.last_name,
    email: result.email,
    token: accessToken,
    refreshToken,
  });

  if (previousRefreshToken) {
    db.query(
      `UPDATE login_activity SET access_token = ?, refresh_token = ? WHERE refresh_token = ?`,
      [accessToken, refreshToken, previousRefreshToken]
    );
  } else {
    const location = req.body.location || null;
    const userAgent = JSON.stringify(req.headers["user-agent"]) || null;
    db.query(
      `INSERT INTO login_activity (auth_id, location, user_agent, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)`,
      [result.id, location, userAgent, accessToken, refreshToken]
    );
  }
};

module.exports = { LoginData };
