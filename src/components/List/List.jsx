import React, { Component } from 'react';
import './List.css';
import axios from 'axios';
import { Expense } from '../../utilities/expense';

export class ListComponent extends Component {
    state = {
        expenseList: []
    }

    render() {
        return (<div className="listcontainer">
            <span className="listtitle">All Expenses</span>
            <hr />
            <div className="allexpenses">
                {this.state.expenseList.map(expense => {
                    return (<div className="expense">
                        <div>
                            <span className="expensemoney">{expense.money}&#8377;</span>
                            <br />
                            <span className="expenseremark">{expense.remark}</span>
                        </div>
                        <div>
                            <span className="expenselabel">{expense.label}</span>
                            <br />
                            <br />
                            <i className="far fa-trash-alt" id="delicon" onClick={() => this.deleteExpense(expense._id)}></i>
                        </div>
                    </div>)
                })}
            </div>
            <div className="refreshbtn">
                <i className="fas fa-sync-alt" onClick={this.getRecentData}></i>
            </div>
        </div>)
    }

    componentDidMount() {
        this.getRecentData();
    }

    getRecentData = () => {
        axios.get('http://localhost:4000/expenses').then((data) => {
            this.setState({ expenseList: data.data });
        });
    }

    deleteExpense = (id) => {
        axios.delete(`http://localhost:4000/expenses/${id}`).then((data) => {
            alert(data.data.message);
            this.getRecentData();
        });
    }
}