import React, { useState, useEffect } from 'react';
import contactService from './services/contacts';
import ContactForm from './components/ContactForm';
import ContactsDashboard from './components/ContactsDashboard';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => setContacts(initialContacts));
  }, []);

  const handleNameInputChange = e => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberInputChange = e => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterInputChange = e => {
    setFilter(e.target.value);
  };

  const displayNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification({}), 2500);
  };

  const addContact = e => {
    e.preventDefault();
    const newContact = { name: newName, number: newPhoneNumber };
    const existingContact = contacts.find(c => c.name === newContact.name);

    if (existingContact) {
      if (
        window.confirm(
          `${newContact.name} is already present in the phonebook. Do you wish to update its phone number?`
        )
      ) {
        contactService
          .updateContact(existingContact.id, newContact)
          .then(updatedContact => {
            setContacts(
              contacts.map(contact =>
                contact.id !== updatedContact.id ? contact : updatedContact
              )
            );
            displayNotification(
              `${updatedContact.name} was updated!`,
              'success'
            );
          })
          .catch(error => {
            displayNotification(
              `${existingContact.name} was already removed from the server!`,
              'error'
            );
            setContacts(contacts.filter(c => c.id !== existingContact.id));
          });
      }
    } else {
      contactService.addContact(newContact).then(addedContact => {
        setContacts(contacts.concat(addedContact));
        displayNotification(`${addedContact.name} was added!`, 'success');
      });
    }

    setNewName('');
    setNewPhoneNumber('');
  };

  const deleteContact = id => {
    const { name } = contacts.find(contact => contact.id === id);
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .deleteContact(id)
        .then(res => {
          displayNotification(`${name} was deleted!`, 'success');
        })
        .catch(error => {
          displayNotification(
            `${name} was already removed from the server!`,
            'error'
          );
        });
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add new contact</h3>
      <Notification message={notification.text} type={notification.type} />
      <ContactForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        addContact={addContact}
        handleNameInputChange={handleNameInputChange}
        handlePhoneNumberInputChange={handlePhoneNumberInputChange}
      />
      <h3>Contacts</h3>
      <Filter
        filter={filter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <ContactsDashboard
        contacts={filter.length > 0 ? filterContacts() : contacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
