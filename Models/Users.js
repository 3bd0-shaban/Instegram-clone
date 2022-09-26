import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const usesrSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50
    },
    username: {
      type: String,
      min: 3,
      max: 20
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false
    },
    profilePic: {
      type: String,
      default: ""
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    isAdmin: { type: Boolean, default: false, required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);
// usesrSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// usesrSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// usesrSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };
// usesrSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash token (private key) and save to database
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Set token expire date
//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

//   return resetToken;
// };
const Users = mongoose.model('Users', usesrSchema);
export default Users;