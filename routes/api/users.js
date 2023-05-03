const express = require("express");
const ctrl = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../middlewares/validateBody");
const { userSchemas, SUBSCRIPTION_OPTIONS } = require("../../schemas/schemas");
const router = express.Router();
//
router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);
router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch(
  "/",
  authenticate,
  validateBody(
    userSchemas.updatingSubscriptionSchema,
    400,
    `"subscription" must be one of [${SUBSCRIPTION_OPTIONS}]`
  ),
  ctrl.updateSubscription
);

module.exports = router;
