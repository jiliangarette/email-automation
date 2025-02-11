import express from "express";
import { sendTestEmailController } from "../controllers/testEmailController.js";
import { standardEmailController } from "../controllers/jobApplicationController.js";
import { customizeEmailController } from "../controllers/customizeEmailController.js";

const router = express.Router();

router.post("/test-email", sendTestEmailController);
router.post("/standard", standardEmailController);
router.post("/customize-email", customizeEmailController);

export default router;
