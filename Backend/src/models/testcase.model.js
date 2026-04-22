module.exports = (sequelize, DataTypes) => {
  const Testcase = sequelize.define("Testcase", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    problemId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "problem_id"
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: "testcases",
    schema: "public",
    freezeTableName: true,
    timestamps: false
  });

  return Testcase;
};