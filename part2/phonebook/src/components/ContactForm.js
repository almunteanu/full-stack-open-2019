import React from 'react';

const ContactForm = ({
  newName,
  newPhoneNumber,
  addContact,
  handleNameInputChange,
  handlePhoneNumberInputChange,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        Name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        Phone number:{' '}
        <input value={newPhoneNumber} onChange={handlePhoneNumberInputChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default ContactForm;
