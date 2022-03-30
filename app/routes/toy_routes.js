
const express = require('express')
const passport = require('passport')
const Pet = require('../models/pet')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


router.post('/toys/:petId', (req, res, next) => {
    const toy = req.body.toy
    const petId = req.params.petId

    Pet.findById(petId) 
        .then(handle404)

        .then(pet => {
            console.log('this is the pet', pet)
            console.log('this is the toy', toy)
            pet.toys.push(toy)
            
            return pet.save()
        })

        .then(pet => res.status(201).json({pet: pet}))

        .catch(next)
})

router.delete('/toys/:petId/;toyId', requireToken, (req, res, next) => {
    const toyId = req.params.toyId
    const petId = req.params.petId

    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            const theToy = pet.toys.id(toyId)
            requireOwnership(req, pet)
            theToy.remove()
            
            return pet.save()
        })
        .then(() => res.sendStatus(204)) 
        .catch(next)
})

module.exports = router 