const User = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { HttpError } = require("../helpers");
//  --LOGIN--
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  // token creation
  const time = { expiresIn: "23h" };
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET, time);
  user.token = token;
  await user.save();
  return { email, subscription: user.subscription, token };
};
// --REGISTER--
const registerUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  //   password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return { email, subscription: newUser.subscription };
};
// --GET CURRENT--
const currentUser = async (id) => {
  const user = await User.findById(id);

  const { email, subscription } = user;

  return { email, subscription };
};
// --LOGOUT--
const logoutUser = async (id) => {
  const user = await User.findById(id);
  user.token = null;
  await user.save();
  return user;
};
// --UPDATE SUBSCRIPTION--
const updateSubscriptionUser = async (id, { subscription }) => {
  const user = await User.findById(id);
  const { email, subscription: userSubscription } = user;
  if (subscription === userSubscription) {
    throw HttpError(409, `You already have "${subscription}" subscription!`);
  }
  user.subscription = subscription;
  await user.save();
  return { email, subscription };
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
};
