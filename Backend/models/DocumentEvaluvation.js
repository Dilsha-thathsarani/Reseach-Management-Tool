import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
  {
    docID: {
      type: String,
      required: true,
    },
    groupID: {
      type: String,
      required: true,
    },
    researchTopic: {
      type: String,
      required: true,
    },
    groupMembers: {
      type: [String],
      required: true,
    },
    markingScheme: {
      criteriaAndMarks: [
        {
          criteria: { type: String, required: true },
          marks: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

const DocumentEvaluvation = mongoose.model(
  "Document Evaluation",
  DocumentSchema
);
export default DocumentEvaluvation;
