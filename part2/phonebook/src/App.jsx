import { useEffect } from 'react'
import { useState } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import Message from './components/Message'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={addedMessage} isError={isError}/>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setAddedMessage={setAddedMessage} setIsError={setIsError}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} setPersons={setPersons} setAddedMessage={setAddedMessage} setIsError={setIsError}/>
    </div>
  )
}

export default App