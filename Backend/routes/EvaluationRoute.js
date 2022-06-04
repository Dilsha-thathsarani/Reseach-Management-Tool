import express from "express";
import { EvaluateDoc } from "../controllers/EvaluateDocController.js";

const router = express.Router();

router.post("/document", EvaluateDoc);

export default router;
