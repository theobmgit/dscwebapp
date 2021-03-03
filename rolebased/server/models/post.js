import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
  },
  visibility: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
});

export default mongoose.model("Post", postSchema);
