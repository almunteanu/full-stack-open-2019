import React from 'react';
import Contact from './Contact';

const ContactsDashboard = ({ contacts, deleteContact }) => {
  const renderContacts = () =>
    contacts.map(contact => (
      <Contact
        key={contact.id}
        contact={contact}
        deleteContact={deleteContact}
      />
    ));

  return <div>{renderContacts()}</div>;
};

export default ContactsDashboard;
