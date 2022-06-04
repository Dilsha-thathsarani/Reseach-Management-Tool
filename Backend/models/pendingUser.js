import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pendinguserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dl99x/image/upload/v1646240499/images_hiwgpp.png",
    },

    mobile: {
      type: String,
      required: [true, "Please enter your mobile number"],
    },

    user_role: {
      required: [true, "Please select the user role"],
      type: String,
      default: "Student",
    },
    research_area: {
      required: [true, "Please select the research area"],
      type: String,
      default: "",
    },
    reg_number: {
      type: String,
      required: [true, "Please enter your registration number"],
    },
  },
  {
    timestamps: true,
  }
);

const pendingUsers = mongoose.model("pendingUsers", pendinguserSchema);
export default pendingUsers;
