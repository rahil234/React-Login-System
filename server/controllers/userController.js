import userModel from "../models/userModel.js";
import { updateUserProfile, loginUser } from "../models/userModel.js";

const getUser = async (req, res) => {
  userModel.getUser(req.user.userId).then((user) => {
    res.json({ message: "User fetched successfully", user });
  });
};

const uploadProfile = async (req, res) => {
  const { userId } = req.user; // Assuming userId is extracted from the request (e.g., from a JWT)

  const { name, email, phoneNo } = req.body; // This extracts the fields from the request body
  const profileImageUrl = req.file ? req.file.filename : null; // Get the profile image filename if available
  
  try {
    const updatedUser = await updateUserProfile(userId, {
      name,
      email,
      phoneNo,
      profileImageUrl,
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate email and password
    if (email.length < 8 || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Email or password must be at least 8 characters" });
    }

    // Handle login (replace this with actual login logic)
    const { user, token } = await userModel.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate email and password
    if (email.length < 8 || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Email and password must be at least 8 characters" });
    }

    // Handle signup (replace this with actual signup logic)
    const user = await userModel.createUser(email, password);

    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { signup, login, uploadProfile, getUser };
