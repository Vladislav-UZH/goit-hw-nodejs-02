const User = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { SECRET, BASE_URL } = process.env;
const { HttpError, sendgridService } = require("../helpers");
const path = require("path");
const resizer = require("../helpers/resizer");
const fs = require("fs").promises;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
// --REGISTER--
const registerUser = async ({ email, password }) => {
  const verificationToken = nanoid();
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
    verificationToken,
  });
  const sendBody = {
    to: email,
    from: { email: "velganvika@gmail.com" },
    subject: "Account verification",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };
  await sendgridService.sendToEmail(sendBody);
  return { email, subscription: newUser.subscription };
};
//  --LOGIN--
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(
      401,
      "Unverified email! Please, check your email to verify your account and try again."
    );
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
  user.verificationToken = "";
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
  try {
    console.log(tempUpload);
    await resizer(tempUpload);
    const filename = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    //
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(id, { avatarURL });
    return avatarURL;
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};
// --VERIFY USER--
const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
};
// --RESEND EMAIL TO VERIFY USER--
const resendEmailToVerifyUser = async ({ email }) => {
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const sendBody = {
    to: email,
    from: { email: "velganvika@gmail.com" },
    subject: "Account verification",
    html: `
    <!DOCTYPE html>
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
      .container {
        padding: 30px;
        background-color: aliceblue;
        border: rgb(0, 134, 243) solid 1px;
      }
      .myLink:hover {
        font-size: 22px;
        color: rgb(0, 125, 228);
      }
    </style>
    </head>
<body>
<div class="container">
    <a class="myLink" target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>
</div></body>
</html>
    `,
  };

  await sendgridService.sendToEmail(sendBody);
};
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  updateAvatarUser,
  verifyUser,
  resendEmailToVerifyUser,
};
