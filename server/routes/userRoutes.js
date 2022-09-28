const express = require("express");
const router = express.Router();
let bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const userController = require("../controllers/userController");

router.post("/user/sign-up", userController.SignUp);
router.post("/user/log-in", userController.LogIn);
router.get("/user/user-name", userController.GetUserName);
router.get("/user/delete_user", userController.delete_user);
router.get("/user/log-out", userController.LogOut);

router.get("/user/get-tickets", userController.GetTickets);
router.get("/user/details", userController.GetDetails);
router.get("/user/reset_password", userController.reset_password);
router.post("/user/add-ticket", userController.UpdateTicket);
router.post("/user/confirm-ticket/:id", userController.ConfirmOTP);

//Password Reset
router.post("/user/forgot-password", userController.ForgotPassword);

router.get("/user/reset-password", userController.ResetPasswordGet);

router.post(
  "/user/reset-password",
  urlencodedParser,
  userController.ResetPasswordPost
);

router.get("/user/reset-password/:id/:token", userController.ResetPasswordGet);

module.exports = router;

// router.post(
//   "/user/reset-password/:id/:token",
//   urlencodedParser,
//   userController.ResetPasswordPost
// );
