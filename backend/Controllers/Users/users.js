const UserModel = require("../../Models/users.model");

const users = async (_, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = users;