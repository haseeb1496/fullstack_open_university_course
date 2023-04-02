const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (val) => {
        if (val.split("-").length !== 2) {
          return false;
        }
        if (
          !/^\d+$/.test(val.split("-")[0]) ||
          !/^\d+$/.test(val.split("-")[1]) ||
          val.split("-")[0].length < 2 ||
          val.split("-")[0].length > 3
        ) {
          return false;
        }
        return true;
      },
      message: "Invalid phonenumber entered",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
