const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  getList,
  getById,
  removeById,
  add,
  updateById,
  updateStatus,
} = require("./contacts");

//
const ctrl = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatus: ctrlWrapper(updateStatus),
};
module.exports = ctrl;
