const configuration = require("../configs/configuration");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const typeRole = require("../constants/typeRole");

module.exports.register = async (req, res) => {
  res.render("auth/sigup", { error: "" });
};

module.exports.signUp = async (req, res) => {
  try {
    const { ...body } = req.body;
    if (body.username==="admin"){
      body.role= typeRole.ADMIN;
    }else {
      body.role = typeRole.USER;
    }
    console.log("body: ", body);
    const user = await User.create(body);
    if (!user) {
      res.render("auth/sigup", { error: "Tài khoản đã tồn tại" });
    }
    res.redirect("/");
  } catch (error) {
    res.render("auth/sigup", { error: "Tài khoản đã tồn tại" });
  }
};

module.exports.sigin = async (req, res) => {
  res.clearCookie("token");
  res.render("auth/sigin", { error: "" });
};
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.render("auth/sigin", { error: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { username: user.username, _id: user._id },
      configuration.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token);
    res.redirect("/home");
  } catch (error) {
    res.render("auth/sigin", { error: "Sai tài khoản hoặc mật khẩu" });
  }
};

module.exports.validateToken = async (req, res) => {
  const token = req.body.jwt;

  const decode = jwt.verify(token, configuration.JWT_SECRET);

  const user = await User.findById(decode._id);

  if (!user) {
    throw new ResponseError(401, "Invalid token");
  }

  const newToken = jwt.sign(
    { username: user.username, _id: user._id },
    configuration.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userId: user._id,
    username: user.username,
    jwt: newToken,
  });
};
