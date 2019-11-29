import axios from 'axios';

const BASE_URL = 'http://localhost:3001/persons';

const getAllContacts = () => {
  const request = axios.get(BASE_URL);
  return request.then(response => response.data);
};

const addContact = newContact => {
  const request = axios.post(BASE_URL, newContact);
  return request.then(response => response.data);
};

const deleteContact = id => {
  return axios.delete(`${BASE_URL}/${id}`);
};

const updateContact = (id, updatedContact) => {
  const request = axios.put(`${BASE_URL}/${id}`, updatedContact);
  return request.then(response => response.data);
};

export default { getAllContacts, addContact, deleteContact, updateContact };
