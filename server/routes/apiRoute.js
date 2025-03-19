import { Router } from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import apiController from "../controllers/apiController.js";

const apiRoute = Router();

apiRoute.get("/users", authenticateJWT, apiController.getUsers);

export default apiRoute;
