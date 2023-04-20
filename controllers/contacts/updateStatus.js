const { HttpError } = require("../../helpers");
const { updateStatusContact } = require("../../models/contacts");
const updateStatus = async (req, res) => {
  const contact = await updateStatusContact(req.params.contactId, req.body);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(contact);
};

module.exports = updateStatus;
