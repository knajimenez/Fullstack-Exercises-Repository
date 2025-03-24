const Persons = ({ person, deletePerson }) => {
  return (
    <>{person.name} {person.number} <button onClick={deletePerson}>delete</button>
    <br />
    </> 
  )
}

export default Persons