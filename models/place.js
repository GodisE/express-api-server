//subdoc! only needs update, create, and delete

const mongoose = require("mongoose")

const Schema = mongoose.Schema

const placeSchema = new Schema (
    {   
        capital: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        ruler: {
            //this field is an object id
            type: mongoose.Schema.Types.ObjectId,
            //the object id will reference
            //named User in userModel
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

module.exports = placeSchema