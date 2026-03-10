import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Points:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
