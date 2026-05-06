module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Problem",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },

      testCases: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      // 🔥 NEW FIELD
      difficulty: {
        type: DataTypes.STRING,
        defaultValue: "easy", // easy / medium / hard
      },
    },
    {
      tableName: "Problems",
      timestamps: true,
    }
  );
};