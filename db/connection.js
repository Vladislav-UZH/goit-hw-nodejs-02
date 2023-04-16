const mongoose = require("mongoose");
const connectToDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectToDatabase;
