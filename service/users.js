const User = require("../db/models/userModel");

const loginUser = async () => {
  const resp = await User.findById();
  return resp;
};
const registerUser = async () => {
  const resp = await User.findById();
  return resp;
};
const currentUser = async () => {
  const resp = await User.findById();
  return resp;
};
const logoutUser = async () => {
  const resp = await User.findById();
  return resp;
};
const updateSubscriptionUser = async () => {
  const resp = await User.findById();
  return resp;
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
};
