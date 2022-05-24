export default function initColourModel(sequelize, DataTypes) {
  return sequelize.define(
    "colour",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      colour_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      available: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "colours",
      underscored: true,
    }
  );
}