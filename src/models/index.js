const Sequelize = require("sequelize");
const User = require("./user");
const Todo = require("./todoModel");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);

User.associate(db);
Todo.associate(db);

// db.todo = require("./todoModel")(sequelize, Sequelize);
module.exports = db;
