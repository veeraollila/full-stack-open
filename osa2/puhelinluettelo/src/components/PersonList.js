import Person from './Person'

const PersonList = ({ persons, filter}) => {
    const filteredNames = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <ul>
        {filteredNames.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    )
}
export default PersonList