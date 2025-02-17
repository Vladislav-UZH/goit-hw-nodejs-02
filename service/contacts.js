// const HttpError = require("../helpers/HttpError");
const Contact = require("../db/models/contactModel");
const listContacts = async (
  owner,
  { page = 1, limit = 10, favorite = "all" }
) => {
  const skip = (page - 1) * limit;
  console.log(favorite);
  if (favorite === "all") {
    const contacts = await Contact.find({ owner }, "", { skip, limit });
    return contacts;
  }
  const filteredContacts = await Contact.find({ owner, favorite }, "", {
    skip,
    limit,
  });
  return filteredContacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return contact;
};
const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return contact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
