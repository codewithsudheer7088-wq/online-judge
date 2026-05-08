module.exports = (sequelize, DataTypes) => {

  const Submission = sequelize.define("Submission", {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // ================= USER =================
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    // ================= PROBLEM =================
    problemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // ================= LANGUAGE =================
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // ================= CODE =================
    code: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    // ================= STATUS =================
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },

    // ================= OUTPUT =================
    output: {
      type: DataTypes.TEXT("long"),
    },

    // ================= EXECUTION TIME =================
    executionTime: {
      type: DataTypes.STRING,
    },

    // ================= MEMORY =================
    memory: {
      type: DataTypes.STRING,
    },

    // ================= TEST CASES =================
    testCases: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

  },

  {
    timestamps: true
  });

  // ================= ASSOCIATIONS =================
  Submission.associate = (models) => {

    Submission.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Submission.belongsTo(models.Problem, {
      foreignKey: "problemId",
    });

  };

  return Submission;
};