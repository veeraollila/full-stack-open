import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/FilterNames'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    personsService.getAll()
    .then(returnedPersons => setPersons(returnedPersons))})

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if(persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()))
      alert(`Person ${newName} already exists!`)
    else if(persons.find((person) => person.number === newNumber))
      alert(`Number ${newNumber} already exists!`)
    else{
      personsService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) =>{
    if(
      window.confirm(`Are you sure you want to delete ${person.name}?`)
      )
      {
        personsService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(removedPerson => removedPerson.id !== person.id))
        })
      }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterInput} />
      <h2>Add Person</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameOnChange={handleNameInput} 
        numberValue={newNumber} 
        numberOnChange={handlePhoneInput} 
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )

}

export default App