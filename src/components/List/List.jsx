import React, { Component } from 'react';
import './List.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export class ListComponent extends Component {
    state = {
        expenseList: [],
        showDeletedModal: false
    }

    render() {
        return (<div className="listcontainer">
            <span className="listtitle">All Expenses</span>
            <hr />
            <div className="allexpenses">
                {this.state.expenseList.map(expense => {
                    return (<div className="expense" key={expense._id}>
                        <div>
                            <span className="expensemoney">{expense.money}&#8377;</span>
                            <br />
                            <span className="expenseremark">{expense.remark}</span>
                        </div>
                        <div>
                            <span className="expenselabel">{(expense.label) ? expense.label : 'No Label'}</span>
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
            <Modal show={this.state.showDeletedModal} onHide={() => this.displayDeletedModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Expense Deleted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Expense has been successfully deleted!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.displayDeletedModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
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
            this.displayDeletedModal(true);
            this.getRecentData();
        });
    }

    displayDeletedModal = (flag) => {
        this.setState({ showDeletedModal: flag });
    }
}