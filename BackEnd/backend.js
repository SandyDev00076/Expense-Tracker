const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
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

// handler for inserting an expense
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

// handler for getting all the expenses
app.get('/expenses', (req, res) => {
    Expense.find((err, expenses) => {
        if (err) return console.error(err);

        if (req.query.sortBy === 'time') { // sorting by time stamps
            if (req.query.order === 'asc') { // oldest to latest
                expenses.sort((a, b) => {
                    return moment(a.timeStamp).toDate() - moment(b.timeStamp).toDate();
                });
            } else { // latest to oldest
                expenses.sort((a, b) => {
                    return moment(b.timeStamp).toDate() - moment(a.timeStamp).toDate();
                });
            }
        } else if (req.query.sortBy === 'money') { // sorting by expense value
            if (req.query.order === 'asc') { // oldest to latest
                expenses.sort((a, b) => {
                    return a.money - b.money;
                });
            } else { // latest to oldest
                expenses.sort((a, b) => {
                    return b.money - a.money;
                });
            }
        }
        res.send(expenses);
    });
});

// handler for deleting expense
app.delete('/expenses/:id', (req, res) => {
    Expense.deleteOne({ _id: req.params.id }, (err) => {
        if (err) console.error(err);
        res.send({
            message: 'Expense successfully deleted!',
            status: 'done'
        });
    });
});

// listen tells the server to listen to a port.
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});