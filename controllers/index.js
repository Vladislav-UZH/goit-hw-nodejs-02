const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  getList,
  getById,
  removeById,
  add,
  updateById,
  updateStatus,
} = require("./contacts");
const {
  register,
  current,
  logout,
  login,
  updateSubscription,
  updateAvatar,
} = require("./users");
//
const ctrl = {
  // contacts ctrl
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatus: ctrlWrapper(updateStatus),
  // auth and users ctrl
  register: ctrlWrapper(register),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  login: ctrlWrapper(login),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
module.exports = ctrl;
