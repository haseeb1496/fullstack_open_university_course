import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const formSubmit = (evt) => {
    evt.preventDefault();
    const newPerson = { name: newName, number };
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(personExists.id, newPerson)
          .then((res) => {
            setNotification(`Updated ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            let newPersons = [...persons];
            newPersons = newPersons.map((person) =>
              person.id === res.id ? res : person
            );
            setPersons(newPersons);
            setNewName("");
            setNumber("");
          })
          .catch(() => {
            setError(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
            const newPersons = [...persons];
            newPersons.splice(
              newPersons.findIndex((person) => person.id === personExists.id)
            );
            setPersons(newPersons);
          });
      }
    } else {
      personService.createPerson(newPerson).then((res) => {
        setNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setPersons(persons.concat(res));
        setNewName("");
        setNumber("");
      });
    }
  };

  const handleNameChange = (evt) => {
    setNewName(evt.target.value);
  };

  const handleNumberChange = (evt) => {
    setNumber(evt.target.value);
  };

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        const newPersons = [...persons];
        newPersons.splice(newPersons.findIndex((person) => person.id === id));
        setPersons(newPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={error} />
      <Filter searchTerm={searchTerm} changeEvent={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={number}
        formSubmit={formSubmit}
        nameChangeEvent={handleNameChange}
        numberChangeEvent={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        searchTerm={searchTerm}
        persons={persons}
        deletePerson={(name, id) => deletePerson(name, id)}
      />
    </div>
  );
};

export default App;
