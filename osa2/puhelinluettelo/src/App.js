import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if(persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()))
      alert(`Person ${newName} already exists!`)
    else if(persons.find((person) => person.number === newNumber))
      alert(`Number ${newNumber} already exists!`)
    else
      setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) =>{
    setNewNumber(event.target.value)
  }

  const handeFilterInput = (event) =>{
    setFilter(event.target.value)
  }

  const filteredNames = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search name: <input value={filter} onChange={handeFilterInput}/>
      </div>
      <h2>Add Person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App