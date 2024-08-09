'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('expense_tracker_db', 'root', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

const User = require('./user')(sequelize, DataTypes);
const Expense = require('./expense')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const PaymentMethod = require('./paymentmethod')(sequelize, DataTypes);
const Budget = require('./budget')(sequelize, DataTypes);

// Define associations
User.hasMany(Expense, { foreignKey: 'user_id' });
User.hasMany(Category, { foreignKey: 'user_id' });
User.hasMany(PaymentMethod, { foreignKey: 'user_id' });
User.hasMany(Budget, { foreignKey: 'user_id' });

Category.hasMany(Expense, { foreignKey: 'category_id' });
Budget.belongsTo(Category, { foreignKey: 'category_id' });

sequelize.sync(); // Creates the tables in the database
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
