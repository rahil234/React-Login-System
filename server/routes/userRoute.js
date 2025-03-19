import { Router } from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { upload } from "../utils/multer.js";

const userRoute = Router();

userRoute.get("/user", authenticateJWT, userController.getUser);
userRoute.post("/login", userController.login);
userRoute.post("/signup", userController.signup);
userRoute.patch(
  "/update-profile",
  authenticateJWT,
  upload.single("profileImage"),
  userController.uploadProfile
);

export default userRoute;
