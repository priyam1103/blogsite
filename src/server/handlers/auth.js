const User = require("../models/user");
const bcrypt = require("bcrypt");



exports.me = async function (req, res) {
  try {
    const id = res.locals._id;
    const user_ = await User.findOne({ _id: id });
    if (!user_) {
      res.status(401).json({ message: "Invalid session " });
    } else {
      res.status(200).json({ user_ });
    }
  } catch (err) {
    console.log(err)
  }
};
exports.signUp = async function (req, res) {
  try {
    const { emailId, username, password, mobileNo,age } = req.body;
    const user = await User.findOne({
      $or: [
        { emailId: emailId },
        { username: username.trim() },
        { mobileNo: mobileNo },
      ],
    });
    if (user)
      res.status(401).json({message:"User already exists with username , email id or mobile number" });
    else {
      let hashedpass = await bcrypt.hash(password, 10);
      const user_ = new User({
        username: username.trim(),
        emailId: emailId,
        password: hashedpass,
          mobileNo: mobileNo,
        age:age
      });
      await user_.save();
     
      const token = await user_.generateAuthToken();

      res
        .status(200)
        .json({ token, user_, message: "Sign Up Successfull" });
    }
  } catch (err) {
      console.log(err)
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.SignIn = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user_ = await User.findOne({ username: username.trim() });
    if (user_) {
      let valid = await bcrypt.compare(password, user_.password);

      if (valid) {
        
          const token = await user_.generateAuthToken();
          res.status(200).json({ token, user_, message: "User logged in" });
        
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "Username does not exists" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error occured" });
  }
};
