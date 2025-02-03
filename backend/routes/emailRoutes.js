import express from "express";
import { sendTestEmailController } from "../controllers/testEmailController.js";

const router = express.Router();
router.post("/test-email", sendTestEmailController);
export default router;
