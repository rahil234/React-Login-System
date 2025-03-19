import { Router } from "express";
import jwt from "jsonwebtoken";

const adminRoute = Router();

const admin = {
  email: "admin@gmail.com",
  password: "admin@gmail.com",
};

export const loginUser = async (email, password) => {
  try {
    const user = (email = admin.email);

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = password == admin.password;

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, "QWERTY", {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.length < 8 || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Email or password must be at least 8 characters" });
    }

    const { user, token } = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

adminRoute.get("/dashboard", (req, res) => {
  res.send("Welcome to the admin dashboard");
});

adminRoute.post("/login", login);

export default adminRoute;
