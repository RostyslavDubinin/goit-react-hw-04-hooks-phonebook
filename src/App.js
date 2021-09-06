import React, { useState, useEffect } from "react";

import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import shortid from "shortid";
import infantСontacts from "./components/contacts.json";

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("contacts")) ?? infantСontacts
    );
  });

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeInfo = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;

      case "number":
        setNumber(e.target.value);
        break;

      default:
        return;
    }
  };

  const addContact = (e) => {
    e.preventDefault();
    if (contacts.find((item) => item.name === name)) {
      alert(` ${name} is already in contacts!`);
      setName("");
      setNumber("");
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts((prevState) => [contact, ...prevState]);
    setName("");
    setNumber("");
  };

  function filterContacts(contacts, filter) {
    return contacts.filter((obj) => {
      return obj.name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  }

  const deleteContacts = (e) => {
    setContacts(contacts.filter((contact) => contact.id !== e.target.id));
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        valueName={name}
        valueNumber={number}
        handleChangeInfo={handleChangeInfo}
        addContact={addContact}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        friends={filterContacts(contacts, filter)}
        onDeleteContact={deleteContacts}
      />
    </div>
  );
}

export default App;
