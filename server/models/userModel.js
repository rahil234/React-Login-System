import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "QWERTY";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Simple email regex
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phoneNo: {
      type: Number,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"], // Match 10-digit phone number
    },
    profileImageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.model("users", userSchema);

// Function to create a new user with hashed password
export const createUser = async (email, password, phoneNo) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, hashedPassword, phoneNo });
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { newUser, token };
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export const getUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

// Function to login user
export const loginUser = async (email, password) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

// Function to update user profile
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const { name, email, phoneNo, profileImageUrl } = updatedData;

    // Find the user by ID and update fields
    const updateFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(phoneNo && { phoneNo }),
      ...(profileImageUrl && { profileImageUrl }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields ,
      { new: true }
    );

    console.log(updatedUser);

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user profile: " + error.message);
  }
};

// Export the model and functions
export default { getUser, createUser, updateUserProfile, loginUser };
