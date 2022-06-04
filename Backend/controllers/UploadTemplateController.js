import UplaodTemplateRoute from "../models/UploadTemplate.js";

export const UploadTemplate = async (req, res) => {
  console.log(req.body);
  const AdminName = req.body.AdminName;
  const Title = req.body.Title;
  const SchemaType = req.body.SchemaType;
  const Template = req.body.song;
  const Description = req.body.Description;
  const DeadlineDate = req.body.DeadlineDate;
  const DeadlineTime = req.body.DeadlineTime;

  const newType = new UplaodTemplateRoute({
    AdminName,
    Title,
    Template,
    SchemaType,
    Description,
    DeadlineDate,
    DeadlineTime,
  });

  newType
    .save()
    .then(() => {
      res.json("Upload Template Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

//GET ALL TEMPLATE
export const getAllTypes = async (req, res) => {
  await UplaodTemplateRoute.find()
    .then((createtypes) => {
      res.json(createtypes);
    })
    .catch((err) => {
      console.catch.log(err);
    });
};

//DELETE A CREATE TYPE
export const deleteTemplate = async (req, res) => {
  let tempid = req.params.id;
  console.log(tempid);
  await UplaodTemplateRoute.findByIdAndDelete(tempid)
    .then(() => {
      res.status(200).send({ status: "Deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error delete" });
    });
};
