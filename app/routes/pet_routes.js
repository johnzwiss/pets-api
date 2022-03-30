const express = require('express')
const passport = require('passport')

const Pet = require ('../models/pet')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404 

const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router() 


//Routes go here
// INDEX
// GET /pets
router.get('/pets', (req, res, next) => {
	Pet.find()
    .populate('owner')
		.then((pets) => {
			// `pets` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return pets.map((pet) => pet.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((pets) => res.status(200).json({ pets: pets }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /pets/5a7db6c74d55bc51bdf39793
router.get('/pets/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Pet.findById(req.params.id)
    .populate('owner')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "example" JSON
		.then((pet) => res.status(200).json({ pet: pet.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// Create Route 
//Post /pets
router.post('/pets', requireToken, (req, res, next) => {
	// set owner of new pet to be current user
	req.body.pet.owner = req.user.id

	Pet.create(req.body.pet)
		// respond to succesful `create` with status 201 and JSON of new pet
		.then((pet) => {
			res.status(201).json({ pet: pet.toObject() })
		})
		// if an error occurs, pass it off to the error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

//replace with routes plz 



//Routes Above Here

module.exports = router
