import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/FilterNames'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() =>{
    personService.getAll()
    .then(returnedPersons => setPersons(returnedPersons))})

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const personToUpdate = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    console.log("personToUpdate: ", personToUpdate)
    if(personToUpdate){
      if(
        window.confirm(`Person ${newName} already exists! Do you want to update their number?`)
      ){
        personService.update(personToUpdate.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
          setMessage(`Update ${newName} number to: ${newNumber}`)
          setTimeout(() => {setMessage(null)}, 3000)
        })
      }
    }
    else if(persons.find((person) => person.number === newNumber))
      alert(`Number ${newNumber} already exists!`)
    else{
      personService.create(newPerson)
      .then(returnedPerson => {
        setMessage(`Added ${newName}`)
        setPersons(persons.concat(returnedPerson))
        setTimeout(() => {setMessage(null)}, 3000)
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
        personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(removedPerson => removedPerson.id !== person.id))
          setMessage(`Removed ${person.name} `)
          setTimeout(() => {setMessage(null)}, 3000)
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
      <Notification message={message} />
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