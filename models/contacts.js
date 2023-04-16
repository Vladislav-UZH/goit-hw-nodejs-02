// const HttpError = require("../helpers/HttpError");
const Contact = require("../db/models/contactModel");
const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
