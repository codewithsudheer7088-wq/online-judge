module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define("Problem", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4   // 🔥 THIS FIX
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: "problems",
    schema: "public",
    freezeTableName: true,
    timestamps: false
  });

  return Problem;
};