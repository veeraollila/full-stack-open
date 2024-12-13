import { useEffect, useState } from 'react'
import { getAll, create, updateContact, deleteContact } from './components/contactService'

// Filter component
const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
  Search: <input value={searchTerm} onChange={handleSearchChange} />
  </div>
)

// PersonForm component
const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleConcat }) => (
  <form onSubmit={handleConcat}>
  <div>
  Name: <input value={newName} onChange={handleNameChange}/>
  </div>
  <div>
  Number: <input value={newNumber} onChange={handleNumberChange}/>
  </div>
  <div>
  <button type="submit">Add</button>
  </div>
  </form>
)

// Persons component
const Persons = ({ contacts, handleCheckboxChange }) => (
  <div>
  {contacts.map((contact, index) => (
    <p key={index}>
    <input type="checkbox" onChange={(event) => handleCheckboxChange(contact.id, event.target.checked)} />
    {contact.name}: {contact.number}
    </p>
  ))}
  </div>
)

const NotificationWrapper = ({ message, children }) => {
  return (
    <div style={{ minHeight: '50px' }}>
    {message ? children : null}
    </div>
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

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className="error">
    {message}
    </div>
  )
}


const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    getAll()
    .then(response => {
      setContacts(response.data);
    })
  }, [])
  
  const handleCheckboxChange = (id, isChecked) => {
    setSelectedContacts(prevSelectedContacts =>
      isChecked
      ? [...prevSelectedContacts, id]
      : prevSelectedContacts.filter(contactId => contactId !== id)
    )
  }
  
  const handleDeleteSelected = () => {
    if (selectedContacts.length > 0) {
      if (window.confirm("Are you sure you want to delete the selected contacts?")) {
        const promises = selectedContacts.map(id => deleteContact(id))
        const deletedNames = selectedContacts.map(id => contacts.find(contact => contact.id === id).name).join(', ')
        Promise.all(promises)
        .then(() => {
          setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)))
          setSelectedContacts([])
          setNotification(`Deleted ${deletedNames}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
    }
  }
  
  const handleConcat = (event) => {
    event.preventDefault();
    const existingContact = contacts.find(contact => contact.name === newName);
    
    if (existingContact) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedContact = { ...existingContact, number: newNumber };
        updateContact(existingContact.id, updatedContact)
        .then(response => {
          setContacts(contacts.map(contact => contact.id !== existingContact.id ? contact : response.data));
          setNotification(`Updated ${newName}'s number`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setContacts(contacts.filter(contact => contact.id !== existingContact.id))
        })
      }
    } else {
      const newContact = { name: newName, number: newNumber }
      create(newContact)
      .then(response => {
        setContacts(contacts.concat(response.data));
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const contactsToShow = searchTerm
  ? contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
  : contacts
  
  
  return (
    <div className="app-container">
    <div className="contacts-container">
    <Persons contacts={contactsToShow} handleCheckboxChange={handleCheckboxChange} />
    <button onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
    <div className="controls-container">
    <NotificationWrapper message={notification}>
    <Notification message={notification} />
    </NotificationWrapper>
    <NotificationWrapper message={error}>
    <ErrorNotification message={error} />
    </NotificationWrapper>
    <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
    <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleConcat={handleConcat} />
    </div>
    </div>
  )
}

export default App