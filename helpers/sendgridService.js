const sendgridMail = require("@sendgrid/mail");
const HttpError = require("./HttpError");
const { SENDGRID_API_KEY } = process.env;
sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendToEmail = async (sendBody) => {
  try {
    if (!sendBody) {
      throw HttpError(`The argument  "sendBody" is required. `);
    }
    const sendingResp = await sendgridMail.send(sendBody);
    return sendingResp;
  } catch (e) {
    console.log(e.response.body);
    throw HttpError(500, e);
  }
};
const sendgridService = { sendToEmail };
module.exports = sendgridService;
