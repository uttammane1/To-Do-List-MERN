const UserModel = require("../../Models/users.model");
const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email, username });

    if (existingUser) {
      return res.status(403).json({ message: "User already exists =" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ email, password: hashPassword, username });

    await user.save();

    return res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = registration;