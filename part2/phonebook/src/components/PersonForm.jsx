import { useState } from "react"
import personsService from "../services/persons"
import areTheseObjectsEqual from "../services/equality"

function PersonForm({ persons, setPersons, setAddedMessage, setIsError }) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let personFound = false
    const personObject = {
      name: newName,
      number: newNumber,
    }
    for (let i = 0; i < persons.length; i++) {
      if (areTheseObjectsEqual(persons[i], personObject)) {
        alert(`${newName} is already added to phonebook`)
        personFound = true
      } else if (persons[i].name === personObject.name) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personFound = true
          personsService
            .update(persons[i].id, personObject)
            .then(returnedPerson => {
              const newPersons = persons.filter(person => person.id !== persons[i].id)
              setPersons(newPersons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setIsError(false)
              setAddedMessage(`${returnedPerson.name} number has changed`)
              setTimeout(() => {
                setAddedMessage(null)
              }, 5000)
            })
            .catch(() => {
              setIsError(true)
              setAddedMessage(`Information of ${personObject.name} has already been removed from server`)
              setTimeout(() => {
                setAddedMessage(null)
              }, 5000)
            })
        }
      }
    }
    if (!personFound) {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setIsError(false)
          setAddedMessage(`${returnedPerson.name} added to phonebook`)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(handleNumberInputChange)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm