'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expense.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};