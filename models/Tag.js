const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {
  static async get() {
    return await Tag.findAll({
      attributes: ["id", "tag_name"],
    }).map((tagged) => tagged.dataValues);
  }

  static async getById(id) {
    return Tag.findOne({
      where: {
        id: id,
      },
    });
  }
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
