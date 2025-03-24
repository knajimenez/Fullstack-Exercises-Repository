import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: null, type: null })

  useEffect(() => { // Fetch data from the server
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const updateNumber = () => { // Update a person's number
    const replaceNumber = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
    if (replaceNumber) {
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
          setErrorMessage({ message: `${returnedPerson.name}'s number updated successfully!`, type: 'success' })
          setTimeout(() => {
            setErrorMessage({ message: null, type: null })
          }, 5000)
        })
      return
    }
    else {
      console.log('Cancelled')
      setNewName('')
      setNewNumber('')
      return
    }
  }

  const addPerson = (event) => { // Add a new person to the phonebook
    event.preventDefault()
    const existingPerson = persons.some(person => person.name === newName)
    if (existingPerson) {
      updateNumber(existingPerson)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage({ message: `${returnedPerson.name} added successfully!`, type: 'success' })
        setTimeout(() => {
          setErrorMessage({ message: null, type: null })
        }, 5000)
      })
  }

  const removePerson = (id) => { // Remove a person from the phonebook
    console.log(`Delete ${id}`)
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage({ message: `${person.name} removed from Phonebook`, type: 'success' })
          setTimeout(() => {
            setErrorMessage({ message: null, type: null })
          }, 5000)
        })
        .catch(error => {
          setErrorMessage({ message: `Information of ${person.name} has already been removed from the server`, type: 'error' })
          setTimeout(() => {
            setErrorMessage({ message: null, type: null })
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type} />
      <Filter searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      <h2>Add</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <Persons key={person.id} person={person} deletePerson={() => removePerson(person.id)} />
      )}
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App