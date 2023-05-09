const User = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET } = process.env;
const { HttpError } = require("../helpers");
const path = require("path");
const resizer = require("../helpers/resizer");
const fs = require("fs").promises;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
// --REGISTER--
const registerUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  // default avatar image
  const avatarURL = gravatar.url(email);
  //   password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });

  return { email, subscription: newUser.subscription };
};
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
// --UPDATE USER AVATAR--
const updateAvatarUser = async (id, { path: tempUpload, originalname }) => {
  await resizer(tempUpload);
  const filename = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  //
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(id, { avatarURL });
  return avatarURL;
};
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  updateAvatarUser,
};
