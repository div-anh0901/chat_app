const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const verifytoken = require("../middleware/verifyToken");
const uploadController = require("../controller/uploadController");

router.post(
  "/upload_avatar",
  uploadImage,
  verifytoken,
  uploadController.uploadAvatar
);

module.exports = router;
