const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String, required: true, minlength: 3, maxlength: 10 },
  organization: { type: String, required: true, minlength: 5, maxlength: 10 },
});

module.exports = User = mongoose.model("user", userSchema);
// first string parameter "user" will create table called "users" in MongoDB database
// first parameter will change to lowercase and plural form.
// ex: mongoose.model("Mineral", userSchema); => create "mininerals"
