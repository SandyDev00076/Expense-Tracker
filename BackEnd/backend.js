const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

// Schema for expenses
const Expense = require('./schemas/expense.schema');

app.use(cors()); // enables cross origin resource sharing.
app.use(bodyParser.json()); // formats the incoming request into JSON format.

// connect to mongo db atlas
const connectURI = require('./config/keys').mongoURI;
mongoose.connect(connectURI, { useNewUrlParser: true }).then(() => console.log('Connected To MongoDB.'))
    .catch(err => console.log(err));

// Route handlers
app.post('/expenses', (req, res) => {
    let newExpense = new Expense(req.body);
    newExpense.save((err, expense) => {
        if (err) return console.error(err);
        res.send({
            message: 'Expense successfully added!',
            expenseAdded: expense,
            status: 'done'
        });
    });
});

app.get('/expenses', (req, res) => {
    Expense.find((err, expenses) => {
        if (err) return console.error(err);
        res.send(expenses);
    })
});

// listen tells the server to listen to a port.
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});