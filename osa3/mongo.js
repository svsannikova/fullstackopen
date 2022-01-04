
const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.cvtq7.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 3)
{
console.log('phonebook:')
  Person.find({}).then(persons => {
  persons.forEach(person => {
    console.log(person.name +' '+ person.number)
  })
  mongoose.connection.close()
  process.exit(1)
})
}

const newName = process.argv[3]
const newNumber = process.argv[4]

const person = new Person({
  name: newName,
  number: newNumber
})

person.save().then(result => {
  console.log('Added: ' + result.name +' '+ result.number)
  mongoose.connection.close()
})
