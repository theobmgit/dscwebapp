import mongoose from "mongoose";
import Post from "post";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "banned"],
  },
  post: [Post],
  accessToken: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
