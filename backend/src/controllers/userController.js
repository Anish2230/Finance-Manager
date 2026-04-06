import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

