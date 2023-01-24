

const mongoose = require("mongoose")
const placeSchema = require("./place")
const Schema = mongoose.Schema


const personSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 0
        },
        places: [placeSchema]
    },
    {
        timestamps: true
    }
)

const Person = mongoose.model("Person", personSchema)

module.exports = Person