const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("todo", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

class TodoModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        checked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize, // Sequelize 인스턴스 전달
        timestamps: false,
        modelName: "Todo",
        tableName: "todos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Todo.belongsTo(db.User, { foreignKey: "todolist", targetKey: "id" });
    // User 모델이 필요함
  }
}

TodoModel.init(sequelize); // init 메서드 호출

module.exports = TodoModel;
