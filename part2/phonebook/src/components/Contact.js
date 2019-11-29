import React from 'react';

const Contact = ({ contact, deleteContact }) => {
  return (
    <p>
      {contact.name} {contact.number}{' '}
      <button type="button" onClick={() => deleteContact(contact.id)}>
        delete
      </button>
    </p>
  );
};

export default Contact;
