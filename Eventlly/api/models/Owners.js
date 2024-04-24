const mongoose = require("mongoose");
const { Schema } = mongoose;

const OwnerSchema = new Schema({
    ownerid: { 
        type: Number, 
        unique: true,
        default: function() {
            // Generate a unique identifier (e.g., using Date.now())
            return Date.now();
        }
    },
    ownerfirstname: String,
    ownerlastname: String,
    ownerusername: { type: String, unique: true },
    ownerpassword: String,
    owneremail: { type: String, unique: true },
    ownerphone: { type: Number, unique: true },
    owneraadharno: { type: Number, unique: true },
});

const OwnersModel = mongoose.model("Owner", OwnerSchema);
module.exports = OwnersModel;
