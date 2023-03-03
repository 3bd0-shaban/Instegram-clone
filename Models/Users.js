import mongoose from 'mongoose';
const usesrSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 3,
      max: 50
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
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
    bio: {
      type: String,
    },
    phoneNumber: {
      type: String
    },
    gender: {
      type: String
    },
    birthday: {
      year: String,
      month: String,
      day: String,
    },
    avatar: {
      public_id: {
        type: String,
      }, url: {
        type: String,
      }
    },
    otp: Number,
    isprivat: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isEmailActivated: {
      type: Boolean,
      default: false
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    blocklist: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    bendingRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    saves: [{
      type: mongoose.Types.ObjectId,
      ref: 'Posts',
      default: []
    }],
    roles: {
      type: [String],
      default: ["user"],
    },
  },
  { timestamps: true }
);
const Users = mongoose.model('Users', usesrSchema);
export default Users;