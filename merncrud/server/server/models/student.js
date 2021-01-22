import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Student", studentSchema);
