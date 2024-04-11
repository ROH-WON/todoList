const todoModel = require("./models/todoModel");

class TodoService {
  async getAllTodos() {
    try {
      const todos = await todoModel.findAll();
      return todos;
    } catch (error) {
      throw error;
    }
  }
  async addTodo(text) {
    try {
      console.log("받은 할 일 내용:", text);
      const todo = await todoModel.create({ text });
      return todo;
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error.message);
      console.error("Sequelize 오류 상세 정보", error);
      throw error;
    }
  }

  async removeTodo(id) {
    try {
      await todoModel.destroy({ where: { id } });
      return id;
    } catch (error) {
      throw error;
    }
  }
  async toggleTodoStatus(id, checked) {
    try {
      const updatedTodo = await todoModel.update(
        { checked },
        { where: { id } }
      );
      return { id, checked };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TodoService;
