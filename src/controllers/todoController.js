const TodoModel = require("../models/todoModel");

class TodoController {
  constructor() {
    this.TodoModel = new TodoModel();
  }

  getAllTodos(req, res) {
    this.TodoModel.getAllTodos((todos) => {
      res.json(todos);
    });
  }

  async addTodo(req, res) {
    const { text } = req.body;
    try {
      const todo = await this.TodoModel.create({ text });
      res.json(todo);
      console.log("할 일이 성공적으로 추가되었습니다: ", todo);
    } catch (error) {
      console.error("할 일 추가 중 오류 발생", error);
      res.status(500).json({ error: "할 일 추가 중 오류 발생" });
    }
  }

  removeTodo(req, res) {
    const { id } = req.params;
    this.TodoModel.removeTodo(id, (id) => {
      res.json({ id });
    });
  }

  toggleTodoStatus(req, res) {
    const { id } = req.params;
    const { checked } = req.body;
    this.TodoModel.toggleTodoStatus(id, checked, (todo) => {
      res.json(todo);
    });
  }
}

module.exports = TodoController;
