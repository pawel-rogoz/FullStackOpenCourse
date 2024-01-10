import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [people, setPeople] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPeople(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue}/>
      <h3>add a new</h3>
      <PersonForm people={people} setPeople={setPeople}/>
      <h3>Numbers</h3>
      <People people={people} filterValue={filterValue}/>
    </div>
  )
}

function Filter({ filterValue, setFilterValue}) {

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilterValueChange} />
    </div>
  )
}

function PersonForm({ people, setPeople}) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [id, setId] = useState(3)

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
      id: id
    }
    for (let i = 0; i < people.length; i++) {
      if(areTheseObjectsEqual(people[i], personObject)) {
        alert(`${newName} is already added to phonebook`)
        personFound = true
      }
    }
    if (!personFound) {
      setPeople(people.concat(personObject))
      setId(id+1)
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

function People({ people, filterValue }) {
  return (
    <div>
      {people
        .filter((person) => {
          if (filterValue.length > 0) {
            return person.name.toLowerCase().includes(filterValue.toLowerCase())
          }
          return true
        })
        .map((person) => {
          return <p key={person.id}>{person.name} {person.number}</p>
        })
      }
    </div>
  )
}

function areTheseObjectsEqual(first, second) {
  "use strict";

  // If the value of either variable is empty
  // we can instantly compare them and check
  // for equality.
  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  // If neither are empty, we can check if
  // their constructors are equal. Because
  // constructors are objects, if they are
  // equal, we know the objects are of the
  // same type (though not necessarily of
  // the same value).
  if (first.constructor !== second.constructor) {
    return false;
  }

  // If we reach this point, we know both
  // objects are of the same type so all
  // we need to do is check what type one
  // of the objects is, and then compare
  // them
  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  // Throught back to the equlity check
  // we started with. Just incase we are
  // comparing simple objects.
  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  // If the value of check we saw above
  // failed and the objects are Dates,
  // we know they are not Dates because
  // Dates would have equal valueOf()
  // values.
  if (first instanceof Date) return false;

  // If the objects are arrays, we know
  // they are not equal if their lengths
  // are not the same.
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  // If we have gotten to this point, we
  // need to just make sure that we are
  // working with objects so that we can
  // do a recursive check of the keys and
  // values.
  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  // We now need to do a recursive check
  // on all children of the object to
  // make sure they are deeply equal
  const firstKeys = Object.keys(first);

  // Here we just make sure that all the
  // object keys on this level of the
  // object are the same.
  const allKeysExist = Object.keys(second).every(
    i => firstKeys.indexOf(i) !== -1
  );

  // Finally, we pass all the values of our
  // of each object into this function to
  // make sure everything matches
  const allKeyValuesMatch = firstKeys.every(i =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

export default App