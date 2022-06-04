dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

//server run in this port 8070
const PORT = process.env.PORT || 8070;

//Connect data base
connectDB();



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Server Started");
})

// Document/ presentation Evaluate Route
import evaluationRouter from "./routes/EvaluationRoute.js";
app.use("/evaluation", evaluationRouter);

// Supervisor/Co supervisor Route
import supervisorRouter from "./routes/SupervisorRoute.js";
app.use("/supervisor", supervisorRouter);

// Topic Register Route
import topicRouter from "./routes/topicregs.js";
app.use("/topic", topicRouter);

// Marking Schema Route
import markingRouter from "./routes/markingschemes.js";

app.use("/markingScheme",markingRouter);

// Evaluated Topics Route
import evaluatedTopicRouter from "./routes/evaluatedtopics.js";
app.use("/evaluatedTopic",evaluatedTopicRouter);


//User Routes
import userRouter from "./routes/userRoute.js";
app.use("/user", userRouter);

import panelRouter from "./routes/PanelMemberRoute.js";
app.use("/panel", panelRouter);

//Submit Type Route
import SubmitTypeRouter from "./routes/SubmitTypeRoute.js";
app.use("/docType", SubmitTypeRouter);

//Upload Image
import uploadImgRouter from "./routes/uploadRoute.js";
app.use("/api", uploadImgRouter);

import router from "./routes/SubmitTypeRoute.js";
app.use("/docType", router);

//Student Group Route
import createRouter from "./routes/StudentGroupRoute.js";
app.use("/stdGroup", createRouter);

//Submit Doc Route
import docRouter from "./routes/SubmitDocRoute.js";
app.use("/document", docRouter);

import uploadRouter from "./routes/UploadTemplateRoute.js";
app.use("/template", uploadRouter);

//request co supervisor
import request from "./routes/ReqRoute.js";
app.use("/request", request);

//send msg to db
import msg from "./routes/chatForumRoute.js";
app.use("/chat", msg);

import reply from "./routes/chatReplyRoute.js";
app.use("/chatReplies", reply);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
