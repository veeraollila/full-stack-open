import Person from './Person'

const PersonList = ({ persons, filter, removePerson}) => {
    const filteredNames = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <ul>
        {filteredNames.map(person => {
          return(
            <Person key={person.id} person={person} removePerson={removePerson} />
          )
        }
        )}
      </ul>
    )
}
export default PersonList