const { addContact } = require("../../models/contacts.js");
//
const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};
module.exports = add;
