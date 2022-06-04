import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UploadTemplateSchema = new Schema(
  {
    AdminName: {
      type: String,
      required: true,
    },

    SchemaType: {
      type: String,
    },

    Title: {
      type: String,
      required: true,
    },

    DeadlineDate: {
      type: Date,
    },
    DeadlineTime: {
      type: "String",
    },

    Template: {
      type: String,
    },

    Description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UploadTemplate = mongoose.model("UploadTemplate", UploadTemplateSchema);
export default UploadTemplate;
