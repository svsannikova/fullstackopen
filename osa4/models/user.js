const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 3,
        required: true
    },
    name: String,
    blogs: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'

        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)