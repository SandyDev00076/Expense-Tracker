const mongoose = require('mongoose');

// creating a schema for Expenses.
const expenseSchema = mongoose.Schema({
    timeStamp: String,
    remark: String,
    money: Number,
    label: String
});

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;