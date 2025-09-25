const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { promisify } = require("util");
require("dotenv").config();
const userModel = require("../model/user.model");
const handlerAsync = require("../middleware/handlerAsync");

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Register User
exports.register = handlerAsync(async (req, res, next) => {
  try {
    const userFound = await userModel.findOne({ email: req.body.email });
    if (userFound) return next(new Error("User already exists"));

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await userModel.create({
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
      address: req.body.address,
    });

    const token = await newUser.createTokenForVerify();

    // const transport = transporter();
    // await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: req.body.email,
    //   subject: "Verification Email",
    //   html: `<a href='${process.env.CLIENT_URL}/verify/${token}'>Verify Your Account</a>`,
    // });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "تأكيد حسابك على MILA Natural Beauty",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #DB2777;">مرحبًا بك في MILA Natural Beauty!</h2>
      <p>شكرًا لتسجيلك معنا. لتفعيل حسابك، يُرجى النقر على الزر أدناه:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href='${process.env.CLIENT_URL}/verify/${token}' 
           style="background-color: #DB2777; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
          تفعيل الحساب
        </a>
      </div>
      <p>إذا لم تقم بإنشاء حساب، يُرجى تجاهل هذه الرسالة.</p>
      <p style="color: #888;">فريق MILA Natural Beauty</p>
    </div>
  `,
    });

    res.status(201).json({
      message:
        "Registered successfully. Check your inbox to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return next(new Error("Registration failed. Please try again."));
  }
});

// Verify Account
exports.verifyAccount = handlerAsync(async (req, res, next) => {
  const token = req.params.token;
  console.log("***********");
  console.log(token);
  console.log("***********");
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
  console.log(email, password);

  const user = await userModel.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new Error("Invalid email or password"));
  }

  if (!user.isVerified) {
    return res.status(403).json({
      message:
        "Account not verified. Please check your email to verify your account.",
    });
  }

  console.log(process.env.JWT_SECRET);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
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

  // await transporter.sendMail({
  //   from: process.env.EMAIL,
  //   to: req.body.email,
  //   subject: "Reset Password",
  //   html: `<a href='${process.env.CLIENT_URL}/resetPass/${token}'>Reset Password</a>`,
  // });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "إعادة تعيين كلمة المرور - MILA Natural Beauty",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #DB2777;">طلب إعادة تعيين كلمة المرور</h2>
      <p>لقد استلمنا طلبًا لإعادة تعيين كلمة المرور الخاصة بحسابك في <strong>MILA Natural Beauty</strong>.</p>
      <p>إذا كنت أنت من قام بهذا الطلب، انقر على الزر أدناه لإعادة تعيين كلمة المرور:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href='${process.env.CLIENT_URL}/resetPass/${token}' 
           style="background-color: #DB2777; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
          إعادة تعيين كلمة المرور
        </a>
      </div>
      <p>إذا لم تطلب إعادة التعيين، يمكنك تجاهل هذه الرسالة بأمان.</p>
      <p style="color: #888;">فريق MILA Natural Beauty</p>
    </div>
  `,
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
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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
