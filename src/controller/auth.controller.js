const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { promisify } = require("util");

const userModel = require("../model/user.model");
const handlerAsync = require("../middleware/handlerAsync");

// Nodemailer Transporter
const transporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
};

// Register User
exports.register = handlerAsync(async (req, res, next) => {
  const userFound = await userModel.findOne({ email: req.body.email });
  if (userFound) return next(new Error("User already exists"));

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await userModel.create({
    email: req.body.email,
    userName: req.body.userName,
    password: hashedPassword,
    address: req.body.address,
  });

  const token = newUser.createTokenForVerify();

  const transport = transporter();
  await transport.sendMail({
    from: "ecommerce@gmail.com",
    to: newUser.email,
    subject: "Verification Email",
    html: `<a href='http://localhost:3000/verify/${token}'>Verify Your Account</a>`,
  });

  res.status(201).json({
    message: "Registered successfully. Check your inbox to verify your account.",
  });
});

// Verify Account
exports.verifyAccount = handlerAsync(async (req, res, next) => {
  const token = req.params.token;
  const user = await userModel.findOne({ emailVerified: token });

  if (!user) return next(new Error("Invalid token"));

  user.emailVerified = "";
  user.isVerified = true;
  await user.save();

  res.status(200).json({
    message: "Your account is verified 🎉",
  });
});

// Login
exports.login = handlerAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email, isVerified: true, isActive: true })
    .select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new Error("Invalid email or password"));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT, { expiresIn: "7d" });
  user.password = undefined;

  res.status(200).json({
    message: "Login successful 👏",
    token,
    user,
  });
});

// Forgot Password
exports.forgetPassword = handlerAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return next(new Error("User not found"));

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPassword = token;
  await user.save();

  const transport = transporter();
  await transport.sendMail({
    from: "ecommerce@gmail.com",
    to: user.email,
    subject: "Reset Password",
    html: `<a href='http://localhost:3000/frontPage/${token}'>Reset Password</a>`,
  });

  res.json({
    message: "Password reset email sent. Check your inbox.",
  });
});

// Reset Password
exports.resetPassword = handlerAsync(async (req, res, next) => {
  const token = req.params.token;
  const user = await userModel.findOne({ resetPassword: token });
  if (!user) return next(new Error("Invalid token"));

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPassword = "";
  await user.save();

  res.status(202).json({
    message: "Password changed successfully",
  });
});

// Auth Middleware
exports.auth = handlerAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Authentication required"));
  }

  const token = authHeader.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERT);

  const user = await userModel.findById(decoded.id);
  if (!user) return next(new Error("User no longer exists"));

  req.user = user;
  next();
});

// Admin Only Middleware
exports.adminOnly = handlerAsync(async (req, res, next) => {
  if (req.user.role === "admin") return next();
  next(new Error("This resource is only for admins"));
});

// Deactivate User
exports.deAactiveUser = handlerAsync(async (req, res, next) => {
  const { userId } = req.body;

  await userModel.findByIdAndUpdate(userId, { isActive: false });

  res.status(202).json({
    message: "User has been deactivated 😥",
  });
});

// Update User (Admin)
exports.updateUser = handlerAsync(async (req, res, next) => {
  const allowedFields = ["userName", "role", "address", "isActive"];
  const updateData = {};

  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      updateData[key] = req.body[key];
    }
  }

  const user = await userModel.findByIdAndUpdate(req.body.userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new Error("User not found"));

  res.status(202).json({
    message: "User updated successfully",
    user,
  });
});