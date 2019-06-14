const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const expenses = [];

app.post('/expenses', (req, res) => {
    expenses.push(req.body);
    res.send({
        message: 'Expense successfully added!',
        status: 'done'
    });
});

app.get('/expenses', (req, res) => {
    res.send(expenses);
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});