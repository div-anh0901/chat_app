const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendMail");
const { CLIENT_URL } = process.env;
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email" });
      }
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "This email aleady exists." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must least 6 characters." });
      }
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}/api/auth/activate/${activation_token}`;
      sendEmail(email, url, "Verify your email address");
      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, email, password } = user;
      const check = await Users.findOne({ email });
      if (check) {
        return res.status(400).json({ msg: "This email already exits." });
      }

      const newUser = new Users({
        name,
        email,
        password,
      });
      await newUser.save();
      res.json({
        msg: "Account has been activated!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        email,
      });
      if (!user) {
        return res.status(400).json({ msg: "This email does exits." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Password is incorrecd.",
        });
      }

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "Please login now!" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist." });
      }
      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/api/reset/${access_token}`;
      sendEmail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password , please check your email" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassowrd: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed!!" });
    } catch (err) {
      res.json({ msg: "Password successfully changed!!" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/auth/refresh_token",
      });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getFriendId: async (req, res) => {
    const userId = req.query.userId;
    const name = req.query.name;
    try {
      const friend = userId
        ? await Users.findById(userId)
        : await Users.findOne({ name });
      const { password, ...other } = friend._doc;
      res.status(200).json(other);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar,
        }
      );
      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const allUser = await Users.find().select("-password");
      res.json(allUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  findUser: async (req, res) => {
    const name = req.query.name;
    try {
      const find = await Users.where({ name: new RegExp(name, 'i') }).limit(10);
      res.status(200).json(find);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userController;
