const express = require("express");
const {
  getList,
  getById,
  add,
  removeById,
  updateById,
  updateStatus,
} = require("../../controllers/index");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");
const {
  addingSchema,
  updatingSchema,
  updatingStatusSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();

router.get("/", getList);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(addingSchema, 400), add);

router.delete("/:contactId", isValidId, removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updatingSchema, 400, "missing fields"),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updatingStatusSchema, 400, "missing field favorite"),
  updateStatus
);
module.exports = router;
