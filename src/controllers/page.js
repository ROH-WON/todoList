const TodoModel = require("../models/todoModel");
const { User } = require("../models");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - todolist" });
};

exports.renderSignup = (req, res) => {
  res.render("signup", { title: "회원 가입 - todolist" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const todos = await TodoModel.findAll({
      include: { model: User, attributes: ["id", "nickname"] },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", { title: "todoList" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
