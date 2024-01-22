import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
  password: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
  email: {
    type: String,
    required: true,
    description: "must be a string and is optional",
  },
});

export const User = mongoose.model("User", userSchema);
