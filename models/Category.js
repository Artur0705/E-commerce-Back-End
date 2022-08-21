const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {
  static async get() {
    return await Category.findAll({
      attributes: ["id", "category_name"],
    }).map((tagged) => tagged.dataValues);
  }

  static async getById(id) {
    return Category.findOne({
      where: {
        id: id,
      },
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
