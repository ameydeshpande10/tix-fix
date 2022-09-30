const express = require("express");
const router = express.Router();
let bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

// user-path
router.post("/user/sign-up", userController.PostSignUp);
router.post("/user/log-in", userController.PostLogIn);
router.get("/user/log-out", authenticate, userController.GetLogOut);
router.get("/user/delete-user", userController.GetDeleteUser);
// user-path-details
router.get("/user/get-tickets", authenticate, userController.GetTickets);
router.get("/user/details", authenticate, userController.GetDetails);
// user-path-reset-password
router.post("/user/forgot-password", userController.ForgotPassword);
router.get("/user/reset-password", userController.GetResetPassword);
router.get("/user/reset-password/:id/:token", userController.GetResetPassword);
router.post(
  "/user/reset-password",
  urlencodedParser,
  userController.PostResetPassword
);

// user-path-book-ticket
router.post("/user/add-ticket", authenticate, userController.PostUpdateTicket);
router.post(
  "/user/confirm-ticket",
  authenticate,
  userController.PostConfirmOTP
);

module.exports = router;
