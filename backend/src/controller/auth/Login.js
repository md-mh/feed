const { db } = require("../../utils/setting");
const bcrypt = require("bcrypt");
const { LoginData } = require("./LoginData");

const Login = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  const value = [email];

  db.get(sql, value, (error, row) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Login failed",
        error: error.message,
      });
    } else {
      if (
        !row ||
        email !== row.email ||
        !bcrypt.compareSync(password, row.password_hash)
      ) {
        res.status(200).send({
          success: false,
          message: "Incorrect email or password",
        });
      } else {
        LoginData(row, req, res, "Login successful");
      }
    }
  });
};

module.exports = { Login };
