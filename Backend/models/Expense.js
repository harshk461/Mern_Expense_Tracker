const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
    },
    // You can add additional fields as needed, such as user_id for authentication
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
