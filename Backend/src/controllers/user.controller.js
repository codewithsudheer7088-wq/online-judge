const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username,
      email,
      password: hashedPassword
    }
  });

};

module.exports = { registerUser };