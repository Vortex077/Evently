const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId,ref:'users'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  minGuests: Number,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model("Venues", placeSchema);
module.exports = PlaceModel;

//city:String,
//state:String,