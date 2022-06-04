import express from "express";
const router = express.Router();

import {
  addTopic,
  getAllTopic,
  getSingleTopic,
  updateSingleRecord,
  deleteTopic,
  getSingleTopicData,
  getGroupID,
} from "../controllers/topicregController.js";

router.post("/", addTopic);

//get all topics
router.get("/", getAllTopic);

//get single topic
router.get("/:id", getSingleTopic);

//get single topic using group ID
router.get("/group/:id", getSingleTopicData);

//update single record
router.put("/:id", updateSingleRecord);

router.delete("/:id", deleteTopic);

router.get("/groupID/:leaderEmail", getGroupID);

export default router;
