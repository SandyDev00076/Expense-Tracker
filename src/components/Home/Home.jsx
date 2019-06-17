import React, { Component } from 'react';
import './Home.css';
import { Templates } from '../../utilities/constants';
import { Expense } from '../../utilities/expense';
import axios from 'axios';
import * as moment from 'moment';
import { ListComponent } from '../List/List';
import { Modal, Button } from 'react-bootstrap';

export class HomeComponent extends Component {
    state = {
        money: '',
        label: 'None',
        remark: '',
        showAddedModal: false
    }
    
    render() {
        return (<div className="container">
            <div className="calculator">
                <div className="moneyplace">
                    {(this.state.money.length === 0) ? "What's the expense?" : this.state.money}
                </div>
                <div className="moneylabel">
                    <span>Pick a label</span>
                    <span>
                        <i className="fas fa-caret-right"></i>
                        <i className="fas fa-caret-right"></i>
                        <i className="fas fa-caret-right"></i>
                    </span>
                    <select className="moneylabeloption" onChange={(event) => this.getLabel(event)} id="templates">
                        {Templates.map(template => {
                            return (<option>{template.title}</option>)
                        })}
                    </select>
                </div>
                <hr />
                <div className="keys">
                    <div className="powerkey" onClick={() => this.changeMoney('1')}>1</div>
                    <div className="powerkey" onClick={() => this.changeMoney('2')}>2</div>
                    <div className="powerkey" onClick={() => this.changeMoney('3')}>3</div>
                    <div className="powerkey" onClick={() => this.changeMoney('4')}>4</div>
                    <div className="powerkey" onClick={() => this.changeMoney('5')}>5</div>
                    <div className="powerkey" onClick={() => this.changeMoney('6')}>6</div>
                    <div className="powerkey" onClick={() => this.changeMoney('7')}>7</div>
                    <div className="powerkey" onClick={() => this.changeMoney('8')}>8</div>
                    <div className="powerkey" onClick={() => this.changeMoney('9')}>9</div>
                    <div className="powerkey" onClick={() => this.changeMoney('00')}>00</div>
                    <div className="powerkey" onClick={() => this.changeMoney('0')}>0</div>
                    <div className="powerkey" onClick={() => this.changeMoney('-1')}>DEL</div>
                </div>
                <hr />
                <div className="remark">
                    <input className="remarkfield" id="remarkid" placeholder="Add some remark" onChange={(event) => this.getRemark(event)}></input>
                </div>
                <div className="taskbar">
                    <div className="taskbtn" id="clear" onClick={() => this.changeMoney('#')}>
                        Clear
                    </div>
                    <div className="taskbtn" id="record" onClick={this.recordExpense}>
                        Record
                    </div>
                </div>
                <Modal show={this.state.showAddedModal} onHide={() => this.displayAddedModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Expense Added</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Expense has been added successfully!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.displayAddedModal(false)}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ListComponent />
        </div>)
    }

    changeMoney = (keyPressed) => {
        switch(keyPressed) {
            case '-1': {
                if (this.state.money.length !== 0) this.setState({ money: this.state.money.substring(0, this.state.money.length - 1) });
            }
            break;
            case '#': {
                this.setState({ money: '', remark: '', label: '' }, () => {
                    document.getElementById('remarkid').value = '';
                    document.getElementById('templates').value = 'None';
                });
            }
            break;
            default: {
                if ((keyPressed !== '0' && keyPressed !== '00') || this.state.money.length !== 0) this.setState({ money: `${this.state.money}${keyPressed}` });
            }
        }
    }

    getRemark = (evt) => {
        this.setState({ remark: evt.target.value });
    }

    getLabel = (evt) => {
        this.setState({ label: evt.target.value });
    }

    recordExpense = () => {
        let { money, label, remark } = this.state;
        let expense = new Expense(moment().toISOString(true), remark, label, parseInt(money));
        axios.post('http://localhost:4000/expenses', expense).then((data) => {
            this.displayAddedModal(true);
            this.changeMoney('#');
        });
    }

    displayAddedModal = (flag) => {
        this.setState({ showAddedModal: flag });
    }
}
