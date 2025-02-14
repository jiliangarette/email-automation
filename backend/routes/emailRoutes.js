import express from "express";
import { sendTestEmailController } from "../controllers/testEmailController.js";
import { standardEmailController } from "../controllers/jobApplicationController.js";
import { customizeEmailController } from "../controllers/customizeEmailController.js";
import { jilianEmailController } from "../controllers/jilianEmailController.js";

const router = express.Router();

router.post("/test-email", sendTestEmailController);
router.post("/standard", standardEmailController);
router.post("/customize-email", customizeEmailController);
router.post("/jilian-email", jilianEmailController);

export default router;
