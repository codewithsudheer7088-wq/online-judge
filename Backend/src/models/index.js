const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

// 🔥 Models load
const Submission = require("./submission.model")(sequelize, DataTypes);
const Testcase = require("./testcase.model")(sequelize, DataTypes);
const Problem = require("./problem.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);

// =====================
// 🔥 RELATIONS (IMPORTANT)
// =====================

// 👉 Submission → User
Submission.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Submission, { foreignKey: "userId" });

// 👉 Submission → Problem
Submission.belongsTo(Problem, { foreignKey: "problemId" });
Problem.hasMany(Submission, { foreignKey: "problemId" });

// 👉 Problem → Testcases
Problem.hasMany(Testcase, { foreignKey: "problemId" });
Testcase.belongsTo(Problem, { foreignKey: "problemId" });

// =====================

module.exports = {
  sequelize,
  Submission,
  Testcase,
  Problem,
  User,
};