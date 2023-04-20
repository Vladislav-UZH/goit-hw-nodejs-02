const { updateContact } = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");
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
module.exports = updateById;
