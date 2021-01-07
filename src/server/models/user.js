const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
        },
        age: {
            type: Number,
            required:true
    },
    blogs: {
          type:Array
        }
  
  },
  { timestamps: true }
);

UserSchema.method("generateAuthToken", async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id, username: user.username },
    "abcdef"
  );
  return token;
});


const User = mongoose.model("User", UserSchema);
module.exports = User;