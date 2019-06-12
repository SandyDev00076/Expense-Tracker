import React, { Component } from 'react';
import './Home.css';
import { Templates } from '../../utilities/constants';

export class HomeComponent extends Component {
    state = {
        money: ''
    }
    
    render() {
        return (<div className="container">
            <div className="calculator">
                <div className="moneyplace">
                    200.00
                </div>
                <div className="moneylabel">
                    <span>Add a label</span>
                    <span>
                        <i className="fas fa-caret-right"></i>
                        <i className="fas fa-caret-right"></i>
                        <i className="fas fa-caret-right"></i>
                    </span>
                    <select className="moneylabeloption">
                        {Templates.map(template => {
                            return (<option>{template.title}</option>)
                        })}
                    </select>
                </div>
                <hr />
                <div className="keys">
                    <div className="powerkey" onClick={this.changeMoney('1')}>1</div>
                    <div className="powerkey" onClick={this.changeMoney('2')}>2</div>
                    <div className="powerkey" onClick={this.changeMoney('3')}>3</div>
                    <div className="powerkey" onClick={this.changeMoney('4')}>4</div>
                    <div className="powerkey" onClick={this.changeMoney('5')}>5</div>
                    <div className="powerkey" onClick={this.changeMoney('6')}>6</div>
                    <div className="powerkey" onClick={this.changeMoney('7')}>7</div>
                    <div className="powerkey" onClick={this.changeMoney('8')}>8</div>
                    <div className="powerkey" onClick={this.changeMoney('9')}>9</div>
                    <div className="powerkey" onClick={this.changeMoney('10')}>#</div>
                    <div className="powerkey" onClick={this.changeMoney('0')}>0</div>
                    <div className="powerkey" onClick={this.changeMoney('-1')}>DEL</div>
                </div>
            </div>
        </div>)
    }

    changeMoney = (keyPressed) => {
        if (keyPressed === '-1') {
            this.setState({ money: this.state.money.substring(0, this.state.money.length - 2) });
        }
        else {
            this.setState({ money: `${this.state.money}${keyPressed}` });
        }
    }
}
