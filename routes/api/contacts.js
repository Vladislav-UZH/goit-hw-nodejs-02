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
const authenticate = require("../../middlewares/authenticate");

const { contactsSchemas } = require("../../schemas/schemas");
const router = express.Router();

router.get("/", authenticate, getList);

router.get("/:contactId", authenticate, isValidId, getById);

router.post(
  "/",
  authenticate,
  validateBody(contactsSchemas.addingSchema, 400),
  add
);

router.delete("/:contactId", authenticate, isValidId, removeById);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(contactsSchemas.updatingSchema, 400, "missing fields"),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(
    contactsSchemas.updatingStatusSchema,
    400,
    "missing field favorite"
  ),
  updateStatus
);
module.exports = router;
