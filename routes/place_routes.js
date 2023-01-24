const express = require("express")

const Person = require("../models/person")
const { handle404 } = require("../lib/custom_errors")
const { requireToken } = require("../config/auth")
const router = express.Router()

//CREATE
//POST /places
router.post("/places", requireToken, (req, res, next) => {
    const personId = req.body.places.personId

    const place = req.body.place

    place.ruler = req.user._id

    console.log(place)
    // Person.findById(personId)
    // .then(handle404)
    // .then(person => {
    //     person.places.push(place)
    //     return person.save()
    // })
    // .then(person => {
    //     res.status(201).json({ person: person })
    })
    // .catch(next)
// })

// //UPDATE
// //PATCH /places/:personId
// router.patch("/places/:personId", (req, res, next) => {
//     const personId = req.body.place.personId

//     const placeBody = req.body.place

//     Person.findById(personId)
//         .then(handle404)
//         .then(person => {
//             //save place doc to vairiable for use
//             //finding the place by its id
//             const places = person.places.id(req.params.personId)

//             //setting new place content to the content being passed in
//             places.set(placeBody)

//             //saving the doc i've modified
//             return person.save()
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })

// //DELETE
// //DELETE places/:personId
// router.delete("/places/:personId", (req, res, next) => {
//     const personId = req.body.place.personId

    
//     Person.findById(personId)
//         .then(handle404)
//         .then(person => {
           
//             person.place.id(req.params.personId).remove()

//             place.save()

//         })
//         .then(() => res.sendStaus(204))
//         .catch(next)
// })



module.exports = router