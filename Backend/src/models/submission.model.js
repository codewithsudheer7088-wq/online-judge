module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define(
    "Submission",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      problemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      code: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },

      output: {
        type: DataTypes.TEXT("long"),
      },

      executionTime: {
        type: DataTypes.STRING,
      },

      memory: {
        type: DataTypes.STRING,
      },

      testCases: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      tableName: "Submissions",
      timestamps: false
    }
  );

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