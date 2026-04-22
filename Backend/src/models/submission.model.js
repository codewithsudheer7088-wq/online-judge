module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Submission",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      problemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    {
      tableName: "Submissions",
      timestamps: false,
    }
  );
};