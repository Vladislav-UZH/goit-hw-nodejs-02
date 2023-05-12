// const { HttpError } = require("../../helpers");
const {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  updateAvatarUser,
} = require("../service/users");
//
const register = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ user });
};
//
const login = async (req, res) => {
  const { token, email, subscription } = await loginUser(req.body);
  res.status(200).json({ token, user: { email, subscription } });
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
const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const file = req.file;
  const avatarURL = await updateAvatarUser(id, file);
  res.status(200).json({ avatarURL });
};
//
module.exports = {
  register,
  current,
  logout,
  login,
  updateSubscription,
  updateAvatar,
};
