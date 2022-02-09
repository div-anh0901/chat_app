require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config");
const fileUpload = require("express-fileupload");
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chat");
const uploadRouter = require("./router/uploadRouter");
connectDB();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/chat", chatRouter);
app.use("/api/auth", userRouter);
app.use("/api/avatar", uploadRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
