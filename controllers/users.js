// const { HttpError } = require("../../helpers");
const {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
} = require("../service/users");
//
const register = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ user });
};
//
const login = async (req, res) => {
  const user = await loginUser(req.body);
  res.status(200).json({ user });
};
//
const current = async (req, res) => {
  const { id } = req.user;
  const user = await currentUser(id);
  res.status(200).json(user);
};
//
const logout = async (req, res) => {
  const { id } = req.user;
  await logoutUser(id);
  res.status(204).end();
};
//
const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const updatedUser = await updateSubscriptionUser(id, req.body);
  res.status(200).json(updatedUser);
};
module.exports = { register, current, logout, login, updateSubscription };
