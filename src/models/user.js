const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        nickname: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: " utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Todo, {
      // foreignKey: { name: "todoId" },
      sourceKey: "email",
    });
  }
}

module.exports = User;
