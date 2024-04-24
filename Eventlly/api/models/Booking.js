const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Venues",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
