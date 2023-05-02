const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../service/contacts");
const { HttpError } = require("../helpers");
//
const add = async (req, res) => {
  const { id } = req.user;
  const result = await addContact({ ...req.body, owner: id });
  res.status(201).json(result);
};
//
const getList = async (req, res) => {
  const { id } = req.user;
  const result = await listContacts(id, req.query);
  if (!result) {
    throw HttpError(404, "Contacts not found");
  }
  res.status(200).json(result);
};
//
const getById = async (req, res) => {
  const result = await getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};
//
const removeById = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json({
    message: "Contact Deleted",
  });
};
//
const updateById = async (req, res) => {
  const id = req.params.contactId;

  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  console.log(result);
  res.status(200).json(result);
};
//
const updateStatus = async (req, res) => {
  const contact = await updateStatusContact(req.params.contactId, req.body);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(contact);
};

module.exports = {
  add,
  getById,
  getList,
  removeById,
  updateById,
  updateStatus,
};
