import express from "express";

import {
  deleteTemplate,
  getAllTypes,
  UploadTemplate,
} from "../controllers/UploadTemplateController.js";
const router = express.Router();

router.post("/", UploadTemplate);

//get all types
router.get("/", getAllTypes);

//delete a type
router.delete("/:id", deleteTemplate);

export default router;
