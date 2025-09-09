const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // e.g., "u1"
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["frontend", "backend", "ml", "devops", "uiux", "admin"], // You can expand as needed
      default: "frontend",
    },
    team_id: {
      type: String, // e.g., "t1"
      required: false,
    },
    access_level: {
      type: String,
      enum: ["user", "lead", "admin"],
      default: "user",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    _id: false, // because we're defining _id manually
  }
);

module.exports = mongoose.model("User", userSchema);
