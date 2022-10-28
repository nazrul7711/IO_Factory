const mongoose = require("mongoose");
let objectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    movies:[{type:objectId,ref:"Movie"}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
