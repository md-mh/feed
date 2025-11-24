const { db } = require("../../utils/setting");
const bcrypt = require("bcrypt");
const { GenerateUuid } = require("../../hooks/Uuid");

const Register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  let userUuid;
  try {
    userUuid = await GenerateUuid();
  } catch (importErr) {
    return res.status(500).send({
      success: false,
      message: "Failed to generate user UUID",
      error: importErr.message,
    });
  }

  const sql =
    "INSERT INTO auth (first_name, last_name, email, password, role, userId) VALUES (?, ?, ?, ?, ?, ?)";
  const value = [first_name, last_name, email, hashPassword, "USER", userUuid];

  // sqlite3 with Promises
  db.run(sql, value, function (error) {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Failed to register user",
        error: error.message,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "User registered successfully",
        userId: userUuid,
        lastID: this.lastID,
      });
    }
  });
};

module.exports = { Register };
