import { Router } from "express";
import { SessionController } from "../controllers/SessionController.js";

export const sessionController = new SessionController();

export const sessionRoutes = Router();

sessionRoutes.post("/", sessionController.create);
