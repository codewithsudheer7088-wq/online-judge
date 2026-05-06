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

    // 🔥 IMPORTANT FIX (column update के लिए)
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced (updated)");

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB ERROR:", error);
  }
};

startServer();