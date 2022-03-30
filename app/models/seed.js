const mongoose =require('mongoose')

const Pet = require('./pet')

const db = require('../../config/db')

const startPets = [
    { name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    { name: 'Leroy', type: 'dog', age: 10, adoptable: true},
    { name: 'Biscuits', type: 'cat', age: 3, adoptable: true},
    { name: 'Hulk Hogan', type: 'hamster', age: 1, adoptable: true}
]

mongoose.connect(db, {
	useNewUrlParser: true,
})
    .then(() => {
        Pet.deleteMany({object: null})
        .then(deletedPets => {
            console.log('deleted pets', deletedPets)
            Pet.create(startPets)
            .then(newPets => {
                console.log('the new pets', newPets)
                mongoose.connection.close()
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })

        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
    })

    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })