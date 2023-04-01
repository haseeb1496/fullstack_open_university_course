const Persons = ({ searchTerm, persons, deletePerson }) =>
  (searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons
  ).map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.name, person.id)}>
        delete
      </button>
    </p>
  ));

export default Persons;
