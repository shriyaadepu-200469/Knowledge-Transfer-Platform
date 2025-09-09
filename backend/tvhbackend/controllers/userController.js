const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, team_id, access_level } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate custom _id like "u169092"
    const customId = `u${Date.now().toString().slice(-6)}`;

    // Create user with manual _id
    const newUser = new User({
      _id: customId,
      name,
      email,
      password: hashedPassword,
      role,
      team_id,
      access_level,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully", userId: newUser._id });
  } catch (error) {
    console.error("Create User Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createUser };
