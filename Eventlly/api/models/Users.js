const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  phone: { type: Number, unique: true },
});


const UserModel = mongoose.model("User", UserSchema);

module.exports=UserModel;
