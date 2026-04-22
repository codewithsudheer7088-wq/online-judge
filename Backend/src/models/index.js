const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Submission = require("./submission.model")(sequelize, DataTypes);
const Testcase = require("./testcase.model")(sequelize, DataTypes);
const Problem = require("./problem.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Submission,
  Testcase,
  Problem,
  User,
};