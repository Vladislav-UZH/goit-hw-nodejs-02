const app = require("./app");

const db = require("./db/connection");
const PORT = process.env.PORT || 8080
const startServer = async () => {
  try {
    await db();

    app.listen(PORT, (e) => {
      if (e) {
        console.error("server launch failed", e);
        return;
      }
      console.log("Database connection successful");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error("database launch failed", e);
    process.exit(1);
  }
};

startServer();
