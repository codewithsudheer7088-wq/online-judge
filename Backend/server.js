require("dotenv").config();

const app = require("./src/app");
const { sequelize } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// 🔥 DB + Server start
const startServer = async () => {
  try {
    // ✅ DB connect
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // ✅ Sync (ONLY for dev)
    await sequelize.sync();
    console.log("✅ Tables synced");

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB ERROR:", error);
  }
};

startServer();