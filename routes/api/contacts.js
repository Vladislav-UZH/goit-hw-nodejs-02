const express = require("express");
const {
  getList,
  getById,
  add,
  removeById,
  updateById,
  updateStatus,
} = require("../../controllers/index");
const validateBody = require("../../middlewares/validateBody");
const {
  addingSchema,
  updatingSchema,
  updatingStatusSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();

router.get("/", getList);

router.get("/:contactId", getById);

router.post("/", validateBody(addingSchema, 400), add);

router.delete("/:contactId", removeById);

router.put(
  "/:contactId",
  validateBody(updatingSchema, 400, "missing fields"),
  updateById
);

router.patch(
  "/:contactId/favorite",
  validateBody(updatingStatusSchema, 400, "missing field favorite"),
  updateStatus
);
module.exports = router;
