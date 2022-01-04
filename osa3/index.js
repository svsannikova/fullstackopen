require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const Person = require('./models/person')

let persons = [
    {
        'name': 'Arto Hellas',
        'number': '040-123456',
        'id': 1
    },
    {
        'name': 'Ada Lovelace',
        'number': '39-44-5323523',
        'id': 2
    },
    {
        'name': 'Dan Abramov',
        'number': '12-43-234345',
        'id': 3
    },
    {
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122',
        'id': 4
    }
]

app.get('/api/persons', (req, res) => {

    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/info', (req, res) => {
    let size = 0
    const dateTime = new Date()
    Person.find({}).then(persons => {
        size = persons.length
    })
    res.send(`<a>Phonebool has info for ${size} people</a><p>${dateTime}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response) => {
    Person.findOneAndUpdate({ id: request.params.id }, { $set: { number: request.body.number } }, { new: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            response.json(docs)
        }

    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body)

    if (!body.name | !body.number) {
        return response.status(400).json({
            error: 'nimi tai numero puuttuu'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'lisättävä nimi on jo luettelossa'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)