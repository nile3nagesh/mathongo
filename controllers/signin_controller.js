const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user_find = await User.findOne({ email: email });
  if (user_find == null) {
    return res.status(400).json({ message: "User not Exists" });
  }
  bcrypt
    .compare(password, user_find.password)
    .then(async function (result) {
      console.log("user validated");
      let otp = Math.floor(Math.random() * 899999 * 1000000).toString(10);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "djnilesh341@gmail.com",
          pass: "bdwxicnvqywkplgr",
        },
      });
      const mailOptions = {
        from: "nileshnagesh3@gmail.com",
        to: email,
        subject: "OTP FOR SIGNIN",
        text: `your otp is ${otp}`,
      };
      console.log(otp);
      user_find.otp = otp;
      try {
        await user_find.save();
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.status(500).json({ message: "email prob" + error });
          } else {
            return res.json({ message: "Email sent for verfication" });
          }
        });
      } catch (err) {
        return res.status(500).json({ message: "password not matched" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "password not matched" });
    });
};

const otpcheck = async (req, res) => {
  let otp = req.body.otp;
  let email = req.body.email;

  let user = await User.findOne({ email: email });

  if (user != null) {
    let savedotp = user.otp;
    // user.otp = null;
    await user.save();
    console.log("otp "+savedotp+" "+otp);
    if (savedotp == otp) {
      const payLoad = {
        _id: user._id,
      };
      const options = { expiresIn: 2147483647 };
      jwt.sign(payLoad, process.env.JWT_KEY, options, (err, token) => {
        if (err) res.status(404).json({ message: "Login failed at jwt" });
        else {
          return res.json({
            message: "Login Authentication successful",
            user: user,
            token: token,
          });
        }
      });
    } else {
      return res.json({ message: "invalid OTP" });
    }
  }
  else
  return res.json({ message: "invalid OTP" });
};

module.exports = { signin: signin, otp: otpcheck };
