import personsService from '../services/persons'

function Persons({ persons, filterValue, setPersons, setAddedMessage, setIsError }) {
    const handlePersonDelete = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
        personsService
            .remove(id)
            .then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                setPersons(newPersons)
            })
            .catch(() => {
                setIsError(true)
                setAddedMessage(`Information of ${name} has already been removed from server`)
            })
        }
    }

    return (
        <div>
        {persons
            .filter((person) => {
            if (filterValue.length > 0) {
                return person.name.toLowerCase().includes(filterValue.toLowerCase())
            }
            return true
            })
            .map((person) => {
            return (
                <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handlePersonDelete(person.id, person.name)}>delete</button>
                </div>
            )
            })
        }
        </div>
    )
}

export default Persons