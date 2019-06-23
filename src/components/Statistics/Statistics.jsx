import React, { Component } from 'react';
import './Statistics.css';
import axios from 'axios';

export default class StatisticsComponent extends Component {
    state = {
        totalSum: 0
    }

    render() {
        return(<div className="statscontainer">
            <div style={{ textAlign: 'center', color: 'grey' }}>
                Total
                <br />
                <span className="totalsum">{this.state.totalSum}&#8377;</span>
            </div>
        </div>)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/expenses/stats').then((data) => {
            this.setState({ totalSum: data.data.total });
        });
    }
}