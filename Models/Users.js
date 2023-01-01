import mongoose from 'mongoose';
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
      lowercase: true,
      required: true,
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
      // select: false
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/abdo9/image/upload/v1664213293/samples/people/istockphoto-1300845620-612x612_ose5xw.jpg"
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    bio:{
      type:String,
    },
    phonenumber:{
      type:String
    },
    gender:{
      type:String
    }
  },
  { timestamps: true }
);
const Users = mongoose.model('Users', usesrSchema);
export default Users;