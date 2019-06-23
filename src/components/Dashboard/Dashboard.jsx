import React, { Component } from 'react';
import './Dashboard.css';
import { CalculatorComponent } from '../Calculator/Calculator';
import { ListComponent } from '../List/List';
import StatisticsComponent from '../Statistics/Statistics';

export default class DashboardComponent extends Component {
    state = {

    }

    render() {
        return(<div className="allcontainer">
            <CalculatorComponent />
            <div>
                <StatisticsComponent />
                <ListComponent />
            </div>
        </div>)
    }
}