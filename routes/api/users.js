const express = require("express");
const ctrl = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
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
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.get("/verify/:verificationToken", ctrl.verify);
router.post(
  "/verify",
  validateBody(
    userSchemas.verifyEmailSchema,
    400,
    "missing required field email"
  ),
  ctrl.resendEmailToVerify
);

module.exports = router;
