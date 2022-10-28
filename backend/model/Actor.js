const mongoose = require("mongoose")
let objectId = mongoose.Schema.Types.ObjectId;

const ActorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    bio: { type: String },
    movies:[{type:objectId,ref:"Movie"}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actor",ActorSchema)