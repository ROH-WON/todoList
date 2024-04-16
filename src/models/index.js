const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const User = require("./user");
const Todo = require("./todoModel");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);

User.associate(db);
Todo.associate(db);

db.Todo = new (require("./todoModel"))(sequelize, Sequelize);

db.User = new (require("./user"))(sequelize, Sequelize);
module.exports = db;
