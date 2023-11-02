import React, { useState, useEffect } from 'react';

import PhoneBook from './phoneBook/PhoneBook';
import { ContactsList } from './contactsList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFilter } from './searchFilter/SearchFilter';
import { Section } from './section/Section';
import styles from './App.module.css';

const LOCALSTORAGE_KEY = 'LOCALSTORAGE_KEY';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(LOCALSTORAGE_KEY);

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    try {
      const initialState = JSON.stringify(contacts);
      localStorage.setItem(LOCALSTORAGE_KEY, initialState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    if (contacts.find(cont => cont.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newContacts = [...contacts, { name, number, id: nanoid() }];
      setContacts(newContacts);
    }
  };

  const searchByName = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const viewContacts = () => {
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(cont => cont.id !== id);
    setContacts(updatedContacts);
  };

  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <Section title="Phonebook">
        <PhoneBook newContact={addNewContact} />
      </Section>

      <Section title="Contacts">
        <SearchFilter searchByName={searchByName} />
        <ContactsList contacts={viewContacts()} deleteItem={deleteContact} />
      </Section>
    </div>
  );
};

export default App;
