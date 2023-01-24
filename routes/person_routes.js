// require Express
const express = require("express");
const { requireToken } = require('../config/auth')
const { handle404 } = require("../lib/custom_errors");

// require the Model we just created
const Person = require("../models/person");

// Creating a router for us to make paths on
const route = express.Router();

route.get("/person", requireToken, (req, res, next) => {
  Person.find()
    .then((person) => {
      return person.map((person) => person);
    })
    .then((person) => res.status(200).json({ person: person }))
    .catch(next);
});

route.get("/person/:id", requireToken, (req, res, next) => {
    Person.findById(req.params.id)
    .then(handle404)
    .then((person) => res.status(200).json({ person: person }))
    .catch(next)
})

// CREATE
// POST /characters
route.post("/person", (req, res, next) => {

//   person = {}
  Person.create(req.body.person)

    .then((person) => {
      res.status(201).json({ person: person })
    })
    .catch(next)

})
//DELETE
//2 ways

// route.delete("/person/delete/:id", (req, res, next) =>{
//   // findind person by id and deletin them
//   Person.findByIdAndDelete(req.params.id)
//   .then((person) => {
//     //then when it goes thru, send a 204 req of confirmation but not showing anything
//     res.status(204).json({ person: person })
//   })
//   .catch(next)
// })

route.delete("/person/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
      .then(handle404)
      .then((person) => {
        person.deleteOne()
      }) 
      .then(() => res.sendStatus(204))
      .catch(next)
})



//2ways of PATCH
// route.patch("/person/update/:id", (req, res, next) => {
//     Person.findById(req.params.id)
//     //if completed make not complete and vice versa
//     Person.checked = !Person.checked
//     res.json(Person)
//     .catch(next)
// })
 route.patch("/person/:id", (req, res, next) => {
    Person.findById(req.params.id)
      .then(handle404)
        .then((person) => {
          return person.updateOne(req.body.person)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
 })


// exporting the router to use elsewhere
module.exports = route;
