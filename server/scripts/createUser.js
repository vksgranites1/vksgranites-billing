import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({
      email: { $regex: "^vksgranites@gmail.com$", $options: "i" },
    });

    if (existingUser) {
      console.log("User already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("vksgranites@12", 10);

    const user = new User({
      email: "vksgranites@gmail.com",
      password: hashedPassword,
    });

    await user.save();

    console.log("✅ Company login created successfully.");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createUser();