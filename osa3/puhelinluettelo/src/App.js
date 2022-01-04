import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonalForm = ({ handleAdd, handleName, handlePhone, name, phone }) => {
  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={phone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  )
}

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}>
          {person.name} {person.number}
          <button type="submit" onClick={() => { handleDelete({ person }) }}>delete</button>
        </li>)}
    </ul >
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const addNameAndPhone = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }
    if (persons.some(p => (p.name === newName))) {
      let message = `${newName} is already added to phonebook, replace the old number with the new one?`
      if (window.confirm(message)) {
        const personToUpdate = persons.find(p => (p.name === newName))
        personService.update(personToUpdate.id, nameObject).then(response => { setPersons(persons.map(person => person.id !== response.id ? person : response)) })
        let notificationMessage = `Updated ${newName}`
        showNotification({notificationMessage})
      }
    }
    else {
      personService
        .create(nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(nameObject))
          let notificationMessage = `Added ${newName}`
          showNotification({notificationMessage})
        })
        .catch(error => {
          let notificationMessage = error.response.data.error.toString()
          showNotification({notificationMessage})
          console.log(error.response.data)
        })
    }
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = ({ person }) => {
    let message = `Delete ${person.name} ?`
    if (window.confirm(message)) {
      const personsToSet = persons.filter(p => p.id !== person.id);
      setPersons(personsToSet)
      personService.remove(person.id).then(response => { console.log(response) })
      let notificationMessage = `Deleted ${person.name}`
      showNotification({notificationMessage})
    }
  }

  const showNotification = ({notificationMessage}) => {
    setMessage(notificationMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const numbersToShow = newFilter.length > 0
    ? persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilterChange} filter={newFilter} />
      <h2>add a new</h2>
      <PersonalForm handleAdd={addNameAndPhone} handleName={handleNameChange} handlePhone={handlePhoneChange} name={newName} phone={newPhone} />
      <h2>Numbers</h2>
      <Persons personsToShow={numbersToShow} handleDelete={deletePerson} />
    </div>
  )

}

export default App