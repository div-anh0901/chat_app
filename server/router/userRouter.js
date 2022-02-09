const router = require("express").Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
router.post("/register", userController.register);

router.post("/activation", userController.activateEmail);
router.post("/login", userController.login);
router.post("/refresh_token", userController.getAccessToken);
router.post("/forgot", userController.forgotPassword);
router.post("/reset", verifyToken, userController.resetPassowrd);
router.get("/info", verifyToken, userController.getUserInfo);
router.get("/friend", userController.getFriendId);
router.get('/find_user', userController.findUser);
router.patch("/update", verifyToken, userController.updateUser);
router.get('/all_info', verifyToken, userController.getAllUser);
router.get("/logout", userController.logout);
module.exports = router;
