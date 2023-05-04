const app = require("./app");

const db = require("./db/connection");
const startServer = async () => {
  try {
    await db();

    app.listen(process.env.PORT, (e) => {
      if (e) {
        console.error("server launch failed", e);
        return;
      }
      console.log("Database connection successful");
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error("database launch failed", e);
    process.exit(1);
  }
};

startServer();
