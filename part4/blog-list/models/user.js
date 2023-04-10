const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 3, unique: true, required: true },
  password: { type: String, minLength: 3, required: true },
  name: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = retDoc._id.toString();
    delete retDoc.password;
    delete retDoc._id;
    delete retDoc.__v;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
