const express = require("express")

const Person = require("../models/person")

const route = express.Router()

const startingPeople = [
    {
        firstName: "Erika",
        lastName: "Helm",
        Age: 1000
    },
    {
        firstName: "Mikasa",
        lastName: "Yoyoma",
        Age: 40
    },
    {
        firstName: "Tawana",
        lastName: "Love",
        Age: 15
    },
]

route.get("person", (req, res, next) => {
    Person.deleteMany({})
        .then(() => {
            Person.create(startingPeople)
                .then((person) => res.statuss(200).json({ person: person }))
        })
        .catch(next)
})


module.exports = route