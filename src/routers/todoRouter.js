// todoRouter.js 파일 내용
const express = require("express");
const TodoController = require("../controllers/todoController");

const todoRouter = express.Router();
const todoController = new TodoController();

todoRouter.get("/todos", todoController.getAllTodos.bind(todoController));
todoRouter.post("/todos/add", todoController.addTodo.bind(todoController));
todoRouter.delete(
  "/todos/remove/:id",
  todoController.removeTodo.bind(todoController)
);
todoRouter.put(
  "/todos/toggle/:id",
  todoController.toggleTodoStatus.bind(todoController)
);

module.exports = todoRouter;
